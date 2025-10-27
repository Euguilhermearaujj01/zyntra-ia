import { GoogleGenAI, Modality } from "@google/genai";
import { CreateFunction, EditFunction, ImageData, Mode } from '../types';

interface GenerateImageOptions {
  prompt: string;
  mode: Mode;
  createFunction: CreateFunction;
  editFunction: EditFunction;
  image1?: ImageData | null;
  image2?: ImageData | null;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = (reader.result as string).split(',')[1];
      resolve(result);
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function generateImage(options: GenerateImageOptions): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API key is not configured. Please set the API_KEY environment variable.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const { prompt, mode, createFunction, editFunction, image1, image2 } = options;

  try {
    if (mode === 'create') {
      let finalPrompt = prompt;
      let aspectRatio: "1:1" | "16:9" | "9:16" | "4:3" | "3:4" = '1:1';

      switch (createFunction) {
        case 'sticker':
          finalPrompt = `A die-cut sticker of ${prompt}, vibrant colors, vector illustration, white background, high quality.`;
          break;
        case 'text':
          finalPrompt = `A professional logo with the text "${prompt}", modern, minimalist, vector, SVG, on a clean white background.`;
          break;
        case 'comic':
          finalPrompt = `A comic book panel illustration of ${prompt}, dynamic action, bold lines, vibrant colors, halftone dots, in the style of classic comics.`;
          break;
        case 'thumbnail':
            finalPrompt = `A compelling and clickable YouTube thumbnail for a video about "${prompt}". Ensure the title text is prominent and easy to read. Use vibrant colors, high contrast, and engaging imagery.`;
            aspectRatio = '16:9';
            break;
        case 'free':
        default:
          finalPrompt = prompt;
          break;
      }

      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: finalPrompt,
        config: {
          numberOfImages: 1,
          aspectRatio: aspectRatio,
          outputMimeType: 'image/png'
        }
      });
      
      if (!response.generatedImages || response.generatedImages.length === 0) {
        throw new Error("Image generation failed, no images returned.");
      }
      return response.generatedImages[0].image.imageBytes;

    } else { // mode === 'edit'
      const model = ai.models['gemini-2.5-flash-image'];

      const parts: any[] = [];
      if (image1) {
        parts.push({ inlineData: { data: image1.base64, mimeType: 'image/png' } });
      }
      if (editFunction === 'compose' && image2) {
        parts.push({ inlineData: { data: image2.base64, mimeType: 'image/png' } });
      }
      
      let editPrompt = prompt;
      switch (editFunction) {
          case 'add-remove':
              editPrompt = `Edit this image by following this instruction: ${prompt}. For example, "add a hat on the person" or "remove the car".`;
              break;
          case 'retouch':
              editPrompt = `Retouch and enhance this image. ${prompt}.`;
              break;
          case 'style':
              editPrompt = `Apply a new style to this image: ${prompt}. For example, "make it look like a watercolor painting".`;
              break;
          case 'compose':
              editPrompt = `Compose these two images together based on the following instruction: ${prompt}.`;
              break;
      }
      parts.push({ text: editPrompt });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: parts },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });
      
      const firstPart = response.candidates?.[0]?.content?.parts?.[0];
      if (firstPart && firstPart.inlineData) {
        return firstPart.inlineData.data;
      } else {
        throw new Error("Image editing failed, no image data in response.");
      }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate image. Please check the console for details.");
  }
}
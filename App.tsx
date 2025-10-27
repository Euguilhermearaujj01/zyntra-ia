
import React, { useState, useCallback } from 'react';
import { Mode, CreateFunction, EditFunction, ImageData } from './types';
import { generateImage } from './services/imageService';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { MobileModal } from './components/MobileModal';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [mode, setMode] = useState<Mode>('create');
    const [activeCreateFunction, setActiveCreateFunction] = useState<CreateFunction>('free');
    const [activeEditFunction, setActiveEditFunction] = useState<EditFunction>('add-remove');
    const [showTwoImagesSection, setShowTwoImagesSection] = useState(false);
    
    const [image1, setImage1] = useState<ImageData | null>(null);
    const [image2, setImage2] = useState<ImageData | null>(null);
    
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

    const handleGenerate = async () => {
        if (!prompt && mode === 'create') {
            setError('Por favor, insira uma ideia para a imagem.');
            return;
        }
        if (mode === 'edit' && !image1) {
            setError('Por favor, envie uma imagem para editar.');
            return;
        }
        if (activeEditFunction === 'compose' && (!image1 || !image2)) {
            setError('São necessárias duas imagens para a função de mesclagem.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const resultBase64 = await generateImage({
                prompt,
                mode,
                createFunction: activeCreateFunction,
                editFunction: activeEditFunction,
                image1,
                image2,
            });
            setGeneratedImage(`data:image/png;base64,${resultBase64}`);
            if (window.innerWidth < 768) {
              setIsMobileModalOpen(true);
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro desconhecido.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageUpload = (file: File, imageSetter: React.Dispatch<React.SetStateAction<ImageData | null>>) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(',')[1];
                imageSetter({ base64: base64String, name: file.name });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleModeChange = (newMode: Mode) => {
        setMode(newMode);
        setGeneratedImage(null);
        setShowTwoImagesSection(false);
        setImage1(null);
        setImage2(null);
    };

    const selectCreateFunction = (func: CreateFunction) => {
        setActiveCreateFunction(func);
    };

    const selectEditFunction = (func: EditFunction) => {
        setActiveEditFunction(func);
        if (func === 'compose') {
            setShowTwoImagesSection(true);
        } else {
            setShowTwoImagesSection(false);
        }
    };

    const editCurrentImage = () => {
        if (generatedImage) {
            const base64 = generatedImage.split(',')[1];
            setImage1({ base64, name: 'generated_image.png'});
            setMode('edit');
            setActiveEditFunction('add-remove');
            setShowTwoImagesSection(false);
            setGeneratedImage(null);
            setPrompt('');
             if (window.innerWidth < 768) {
                setIsMobileModalOpen(false);
            }
        }
    };
    
    const downloadImage = () => {
        if (generatedImage) {
            const link = document.createElement('a');
            link.href = generatedImage;
            link.download = `zyntra_ia_${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const startNewImage = () => {
        setGeneratedImage(null);
        setPrompt('');
        setImage1(null);
        setImage2(null);
        setMode('create');
        setIsMobileModalOpen(false);
    };


    return (
        <div className="bg-dark-bg text-white min-h-screen flex flex-col md:flex-row font-sans">
            <LeftPanel
                prompt={prompt}
                setPrompt={setPrompt}
                mode={mode}
                handleModeChange={handleModeChange}
                activeCreateFunction={activeCreateFunction}
                selectCreateFunction={selectCreateFunction}
                activeEditFunction={activeEditFunction}
                selectEditFunction={selectEditFunction}
                showTwoImagesSection={showTwoImagesSection}
                setShowTwoImagesSection={setShowTwoImagesSection}
                image1={image1}
                image2={image2}
                handleImageUpload={handleImageUpload}
                setImage1={setImage1}
                setImage2={setImage2}
                isLoading={isLoading}
                handleGenerate={handleGenerate}
            />
            <RightPanel
                isLoading={isLoading}
                error={error}
                generatedImage={generatedImage}
                editCurrentImage={editCurrentImage}
                downloadImage={downloadImage}
            />
             <MobileModal
                isOpen={isMobileModalOpen}
                imageSrc={generatedImage}
                onEdit={editCurrentImage}
                onDownload={downloadImage}
                onNewImage={startNewImage}
            />
        </div>
    );
};

export default App;
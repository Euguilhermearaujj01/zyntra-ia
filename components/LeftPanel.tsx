import React from 'react';
import { CreateFunction, EditFunction, ImageData, Mode } from '../types';
import {
    PromptIcon, StickerIcon, TextIcon, ComicIcon, ThumbnailIcon,
    AddRemoveIcon, RetouchIcon, StyleIcon, ComposeIcon, UploadIcon
} from './icons';

interface LeftPanelProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    mode: Mode;
    handleModeChange: (mode: Mode) => void;
    activeCreateFunction: CreateFunction;
    selectCreateFunction: (func: CreateFunction) => void;
    activeEditFunction: EditFunction;
    selectEditFunction: (func: EditFunction) => void;
    showTwoImagesSection: boolean;
    setShowTwoImagesSection: (show: boolean) => void;
    image1: ImageData | null;
    image2: ImageData | null;
    handleImageUpload: (file: File, setter: React.Dispatch<React.SetStateAction<ImageData | null>>) => void;
    setImage1: React.Dispatch<React.SetStateAction<ImageData | null>>;
    setImage2: React.Dispatch<React.SetStateAction<ImageData | null>>;
    isLoading: boolean;
    handleGenerate: () => void;
}

const FunctionCard: React.FC<{ icon: React.ReactNode; name: string; isActive: boolean; onClick: () => void }> = ({ icon, name, isActive, onClick }) => (
    <div
        onClick={onClick}
        className={`function-card flex flex-col items-center justify-center p-2.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
            isActive ? 'bg-accent/10 border-accent' : 'bg-input-bg border-transparent hover:border-accent/50'
        }`}
    >
        <div className={`icon mb-1.5 ${isActive ? 'text-accent' : 'text-gray-300'}`}>{icon}</div>
        <div className={`name text-xs font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{name}</div>
    </div>
);

const ImageUploadArea: React.FC<{
    id: string;
    image: ImageData | null;
    onUpload: (file: File) => void;
    title: string;
}> = ({ id, image, onUpload, title }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    return (
        <div 
            className="upload-area-dual relative flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer hover:border-accent transition-colors duration-200 h-36 bg-input-bg"
            onClick={() => document.getElementById(id)?.click()}
        >
            <input type="file" id={id} accept="image/*" className="hidden" onChange={handleFileChange} />
            {image ? (
                <img src={`data:image/png;base64,${image.base64}`} alt="Preview" className="image-preview absolute inset-0 w-full h-full object-cover rounded-lg" />
            ) : (
                <>
                    <UploadIcon className="w-8 h-8 text-gray-400 mb-2"/>
                    <span className="font-semibold">{title}</span>
                    <span className="upload-text text-xs text-gray-500">Clique para selecionar</span>
                </>
            )}
        </div>
    );
};


export const LeftPanel: React.FC<LeftPanelProps> = (props) => {
    const {
        prompt, setPrompt, mode, handleModeChange,
        activeCreateFunction, selectCreateFunction,
        activeEditFunction, selectEditFunction,
        showTwoImagesSection, setShowTwoImagesSection,
        image1, image2, handleImageUpload, setImage1, setImage2,
        isLoading, handleGenerate
    } = props;
    
    return (
        <div className="left-panel w-full md:w-[400px] bg-panel-bg p-6 flex flex-col h-screen md:max-h-screen overflow-y-auto scrollbar-hide">
            <div className="flex-grow">
                <header>
                    <h1 className="panel-title text-2xl font-bold">zyntra ia</h1>
                    <p className="panel-subtitle text-gray-400">Seu estúdio de IA para imagens</p>
                </header>

                <div className="prompt-section mt-6">
                    <div className="section-title text-sm font-semibold mb-2">Qual a sua ideia:</div>
                    <textarea
                        id="prompt"
                        className="prompt-input w-full bg-input-bg rounded-lg p-3 text-white border border-gray-700 focus:ring-2 focus:ring-accent focus:outline-none transition-shadow duration-200"
                        rows={4}
                        placeholder="Ex: Um mestre da IA demitindo 30 empregados..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>

                <div className="mode-toggle mt-6 grid grid-cols-2 gap-2 bg-input-bg p-1 rounded-lg">
                    <button onClick={() => handleModeChange('create')} className={`mode-btn uppercase font-semibold py-2 rounded-md transition-colors duration-200 ${mode === 'create' ? 'bg-accent text-black' : 'hover:bg-gray-700'}`}>CRIAR</button>
                    <button onClick={() => handleModeChange('edit')} className={`mode-btn uppercase font-semibold py-2 rounded-md transition-colors duration-200 ${mode === 'edit' ? 'bg-accent text-black' : 'hover:bg-gray-700'}`}>EDITAR</button>
                </div>

                {mode === 'create' && (
                    <div id="createFunctions" className="functions-section mt-6">
                        <div className="functions-grid grid grid-cols-5 gap-2">
                            <FunctionCard icon={<PromptIcon />} name="Prompt" isActive={activeCreateFunction === 'free'} onClick={() => selectCreateFunction('free')} />
                            <FunctionCard icon={<StickerIcon />} name="Figura" isActive={activeCreateFunction === 'sticker'} onClick={() => selectCreateFunction('sticker')} />
                            <FunctionCard icon={<TextIcon />} name="Logo" isActive={activeCreateFunction === 'text'} onClick={() => selectCreateFunction('text')} />
                            <FunctionCard icon={<ComicIcon />} name="Desenho" isActive={activeCreateFunction === 'comic'} onClick={() => selectCreateFunction('comic')} />
                            <FunctionCard icon={<ThumbnailIcon />} name="Thumbnail" isActive={activeCreateFunction === 'thumbnail'} onClick={() => selectCreateFunction('thumbnail')} />
                        </div>
                    </div>
                )}

                {mode === 'edit' && !showTwoImagesSection && (
                    <>
                        <div id="editFunctions" className="functions-section mt-6">
                            <div className="functions-grid grid grid-cols-4 gap-2">
                                <FunctionCard icon={<AddRemoveIcon />} name="Adicionar" isActive={activeEditFunction === 'add-remove'} onClick={() => selectEditFunction('add-remove')} />
                                <FunctionCard icon={<RetouchIcon />} name="Retoque" isActive={activeEditFunction === 'retouch'} onClick={() => selectEditFunction('retouch')} />
                                <FunctionCard icon={<StyleIcon />} name="Estilo" isActive={activeEditFunction === 'style'} onClick={() => selectEditFunction('style')} />
                                <FunctionCard icon={<ComposeIcon />} name="Mesclar" isActive={activeEditFunction === 'compose'} onClick={() => selectEditFunction('compose')} />
                            </div>
                        </div>
                         <div className="dynamic-content mt-4">
                            <ImageUploadArea id="imageUpload" image={image1} onUpload={(file) => handleImageUpload(file, setImage1)} title="Clique ou arraste uma imagem" />
                        </div>
                    </>
                )}

                {mode === 'edit' && showTwoImagesSection && (
                    <div id="twoImagesSection" className="functions-section mt-6">
                        <div className="section-title text-sm font-semibold mb-2">Duas Imagens Necessárias</div>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <ImageUploadArea id="imageUpload1" image={image1} onUpload={(file) => handleImageUpload(file, setImage1)} title="Primeira Imagem" />
                            <ImageUploadArea id="imageUpload2" image={image2} onUpload={(file) => handleImageUpload(file, setImage2)} title="Segunda Imagem" />
                        </div>
                        <button className="back-btn mt-4 text-sm text-accent hover:underline" onClick={() => setShowTwoImagesSection(false)}>← Voltar para Edição</button>
                    </div>
                )}
            </div>
            
            <div className="mt-6">
                <button
                    id="generateBtn"
                    className="generate-btn w-full bg-accent text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleGenerate}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <div className="spinner w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                            <span className="btn-text">Gerando...</span>
                        </>
                    ) : (
                        <span className="btn-text">Gerar Imagem</span>
                    )}
                </button>
            </div>
        </div>
    );
};
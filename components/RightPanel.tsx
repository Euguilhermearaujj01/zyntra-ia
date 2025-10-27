
import React from 'react';
import { ResultPlaceholderIcon, EditActionIcon, DownloadActionIcon } from './icons';

interface RightPanelProps {
    isLoading: boolean;
    error: string | null;
    generatedImage: string | null;
    editCurrentImage: () => void;
    downloadImage: () => void;
}

export const RightPanel: React.FC<RightPanelProps> = ({ isLoading, error, generatedImage, editCurrentImage, downloadImage }) => {
    return (
        <div className="right-panel flex-grow bg-dark-bg p-6 hidden md:flex flex-col items-center justify-center">
            <div className="w-full h-full max-w-[700px] max-h-[700px] bg-panel-bg rounded-2xl flex items-center justify-center relative overflow-hidden">
                {isLoading && (
                    <div id="loadingContainer" className="loading-container text-center">
                        <div className="loading-spinner w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <div className="loading-text mt-4 text-gray-300">Gerando sua imagem...</div>
                    </div>
                )}

                {!isLoading && error && (
                    <div className="text-center text-red-400 p-8">
                        <h3 className="font-bold text-lg">Erro na Geração</h3>
                        <p>{error}</p>
                    </div>
                )}

                {!isLoading && !error && !generatedImage && (
                    <div id="resultPlaceholder" className="result-placeholder text-center text-gray-500">
                        <ResultPlaceholderIcon className="result-placeholder-icon w-16 h-16 mx-auto mb-4" />
                        <div>Sua obra de arte aparecerá aqui</div>
                    </div>
                )}

                {!isLoading && generatedImage && (
                    <div id="imageContainer" className="image-container w-full h-full group">
                        <img id="generatedImage" src={generatedImage} alt="Generated art" className="generated-image w-full h-full object-contain" />
                        <div className="image-actions absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button onClick={editCurrentImage} title="Editar" className="action-btn bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-accent hover:text-black transition-colors duration-200">
                                <EditActionIcon />
                            </button>
                            <button onClick={downloadImage} title="Download" className="action-btn bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-accent hover:text-black transition-colors duration-200">
                                <DownloadActionIcon />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

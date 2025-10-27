
import React from 'react';
import { EditActionIcon, DownloadActionIcon, NewImageActionIcon } from './icons';

interface MobileModalProps {
    isOpen: boolean;
    imageSrc: string | null;
    onEdit: () => void;
    onDownload: () => void;
    onNewImage: () => void;
}

export const MobileModal: React.FC<MobileModalProps> = ({ isOpen, imageSrc, onEdit, onDownload, onNewImage }) => {
    if (!isOpen) return null;

    return (
        <div 
            id="mobileModal" 
            className="mobile-modal fixed inset-0 bg-black/80 backdrop-blur-sm flex flex-col p-4 z-50 md:hidden"
        >
            <div className="modal-content flex-grow flex items-center justify-center">
                 {imageSrc && <img id="modalImage" src={imageSrc} alt="Generated art" className="modal-image max-w-full max-h-full rounded-lg" />}
            </div>
            <div className="modal-actions grid grid-cols-3 gap-3 pt-4">
                <button onClick={onEdit} className="modal-btn edit bg-gray-700/80 p-3 rounded-lg flex flex-col items-center justify-center text-white font-medium">
                    <EditActionIcon className="mb-1" />
                    Editar
                </button>
                 <button onClick={onDownload} className="modal-btn download bg-gray-700/80 p-3 rounded-lg flex flex-col items-center justify-center text-white font-medium">
                    <DownloadActionIcon className="mb-1" />
                    Salvar
                </button>
                 <button onClick={onNewImage} className="modal-btn new bg-accent p-3 rounded-lg flex flex-col items-center justify-center text-black font-medium">
                    <NewImageActionIcon className="mb-1" />
                    Nova Imagem
                </button>
            </div>
        </div>
    );
};

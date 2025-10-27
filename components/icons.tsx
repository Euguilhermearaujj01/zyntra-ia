import React from 'react';

const commonProps = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.75",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const PromptIcon: React.FC = () => (
  <svg {...commonProps}>
    <path d="M4 19h16M6 3h12v14H6z"/><path d="M8 7h8M8 11h8"/>
  </svg>
);

export const StickerIcon: React.FC = () => (
  <svg {...commonProps}>
    <path d="M7 3h7l7 7v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"/>
    <path d="M14 3v5a2 2 0 0 0 2 2h5"/>
  </svg>
);

export const TextIcon: React.FC = () => (
  <svg {...commonProps}>
    <path d="M4 6h16M10 6v12M14 6v12M6 18h12"/>
  </svg>
);

export const ComicIcon: React.FC = () => (
  <svg {...commonProps}>
    <path d="M3 5h12v10H3z"/><path d="M15 7l6-2v10l-6 2z"/><path d="M5 9h8M5 12h6"/>
  </svg>
);

export const ThumbnailIcon: React.FC = () => (
    <svg {...commonProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
        <path d="m10 11 5 3-5 3v-6Z" fill="currentColor" strokeWidth="0"></path>
    </svg>
);

export const AddRemoveIcon: React.FC = () => (
  <svg {...commonProps}>
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

export const RetouchIcon: React.FC = () => (
  <svg {...commonProps}>
    <path d="M2 22l6-6"/><path d="M3 16l5 5"/><path d="M14.5 2.5l7 7-9.5 9.5H5v-7z"/>
  </svg>
);

export const StyleIcon: React.FC = () => (
  <svg {...commonProps}>
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a7 7 0 1 1-10.8-8.4"/>
  </svg>
);

export const ComposeIcon: React.FC = () => (
  <svg {...commonProps}>
    <rect x="3" y="7" width="10" height="10" rx="1"/><rect x="11" y="3" width="10" height="10" rx="1"/>
  </svg>
);

export const UploadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
);

export const ResultPlaceholderIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
);

export const EditActionIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
);

export const DownloadActionIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

export const NewImageActionIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14m-7-7h14" />
    </svg>
);
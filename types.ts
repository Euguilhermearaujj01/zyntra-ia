export type Mode = 'create' | 'edit';
export type CreateFunction = 'free' | 'sticker' | 'text' | 'comic' | 'thumbnail';
export type EditFunction = 'add-remove' | 'retouch' | 'style' | 'compose';

export interface ImageData {
  base64: string;
  name: string;
}
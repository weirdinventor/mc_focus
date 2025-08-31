export type MediaType = 'text' | 'image' | 'video' | 'audio' | 'document';

export type SendMessageMediaType = Omit<MediaType, 'text'>;

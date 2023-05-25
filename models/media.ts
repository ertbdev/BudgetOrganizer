export enum FileType {
  Pdf = 'application/pdf',
  Jpg = 'image/jpeg',
  Png = 'image/png',
  Mp3 = 'audio/mpeg',
  Mp4 = 'video/mp4',
}

export type Media = {
  gs?: string;
  previewUrl?: string;
  secureUrl?: string;
  path?: string;
  type?: FileType;
};

export type TemplateItem = {
  name: string;
  path: string;

  thumbnail?: string;

  thumbnailWidth: number;
  thumbnailHeight: number;

  previewWidth: number;
  previewHeight: number;

  thumbnailValid: boolean;
  previewValid: boolean;

  preview: boolean;

  templateCount: number;
  templateType: string;

  valid: boolean;
  validationErrors: string[];

  keywords: string;
  templateSize: string;
  pages: string;
  comments: string;
  keywordCount: number;

  filename: string;
  title: string;
  category: string;
  colorspace: string;
};
export interface CreateTemplateParams {
  title: string;
  text_html: string;
  describe: string;
  images: {path: string}[];
}

export type UpdateTemplateParams = Partial<CreateTemplateParams>;

export interface ITemplateResponse {
  id: number;
  title: string;
  text_html: string;
  describe: string;
  images: {path: string}[]
}
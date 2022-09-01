export const GET_TRANSLATE_DATA = 'i18nextProvider/getTranslateData';

export interface II18nextProviderState extends ILang {
  loading: boolean;
  resources: Record<string, Record<string, string>>;
}
export interface IGetTranslateDataArgs extends Partial<ILang> {}
export interface IGetTranslateDataPayload extends ILang, Resource {}

export interface ILang {
  lang: string;
}

export interface Resource {
  resource: Record<string, string>;
}

export interface IResource extends ILang {
  data: Record<string, string>;
}

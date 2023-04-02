import { type AUTO_DETECT, type SUPPORTED_LANGUAGES } from "@constants/index";

export type Lang = keyof typeof SUPPORTED_LANGUAGES;

type Auto = typeof AUTO_DETECT;

export type FromLang = Lang | Auto;

export type State = {
  fromLang: FromLang;
  toLang: Lang;
  text: string;
  translatedText: string;
  isTranslating: boolean;
};

type Setters = {
  interchangeLangs: () => void;
  setFromLang: (fromLang: FromLang) => void;
  setToLang: (toLang: Lang) => void;
  setText: (text: string) => void;
  setTranslatedText: (translatedText: string) => void;
  setIsTranslating: (isTranslating: boolean) => void;
};

export type Store = State & Setters;

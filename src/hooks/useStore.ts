import { create } from "zustand";

import {
  type FromLang,
  type Lang,
  type State,
  type Store,
} from "@internal-types/index";

const initialState: State = {
  fromLang: "auto",
  toLang: "en",
  text: "",
  translatedText: "",
  isTranslating: false,
};

export const useStore = create<Store>((set) => ({
  // Initial State
  ...initialState,
  // Setters
  interchangeLangs: () =>
    set((state) => {
      const loading = state.text !== "";

      if (state.fromLang !== "auto") {
        return {
          fromLang: state.toLang,
          toLang: state.fromLang,
          text: state.translatedText,
          translatedText: "",
          isTranslating: loading,
        };
      }
      return state;
    }),
  setFromLang: (fromLang: FromLang) =>
    set((state) => {
      if (state.fromLang === fromLang) return state;

      const loading = state.text !== "";

      return { fromLang, isTranslating: loading, translatedText: "" };
    }),
  setToLang: (toLang: Lang) =>
    set((state) => {
      if (state.toLang === toLang) return state;

      const loading = state.text !== "";

      return { toLang, isTranslating: loading, translatedText: "" };
    }),
  setText: (text: string) =>
    set(() => {
      const loading = text !== "";

      return { text, isTranslating: loading, translatedText: "" };
    }),
  setTranslatedText: (translatedText: string) =>
    set({ translatedText, isTranslating: false }),
  setIsTranslating: (isTranslating: boolean) => set({ isTranslating }),
}));

import { create } from "zustand";

type LoaderType = {
  isPageLoaded: boolean;
  setIsLoaded: (state: boolean) => void;
};

const usePageLoaderStore = create<LoaderType>((set) => ({
  isPageLoaded: false,
  setIsLoaded: (isPageLoaded: boolean) => set({ isPageLoaded }),
}));

export { usePageLoaderStore };

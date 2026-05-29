import { create } from "zustand";

interface LoadingState {
    isLoading: Boolean,
    setIsLoading: (value: any) => void;
};

export const loadingStore = create<LoadingState>((set, get) => ({
    isLoading: false,
    setIsLoading: (value: any) => {
        set({ isLoading: value });
    }
}))
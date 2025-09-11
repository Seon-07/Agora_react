import { create } from "zustand";

interface AuthState {
    id: string;
    nickname: string;
    setId: (id: string) => void;
    setNickname: (nickname: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    id: "",
    nickname: "",
    setId: (id) => set({ id }),
    setNickname: (nickname) => set({ nickname }),
}));
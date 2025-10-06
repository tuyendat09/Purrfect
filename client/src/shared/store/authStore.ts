import { create } from "zustand";
import { PublicUser } from "../types/User";

interface AuthState {
  user: PublicUser | null;
  setUser: (user: PublicUser) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

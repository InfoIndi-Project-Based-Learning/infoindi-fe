import { create } from "zustand";
import type { User } from "../../types/user";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface AuthStore {
  token: string;
  user: User;
  setAuth: (token: string, user: User) => void;
  removeAuth: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      user: {} as User,
      setAuth: (token, user) => set({ token, user }),
      removeAuth: () => set({ token: "", user: {} as User }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;

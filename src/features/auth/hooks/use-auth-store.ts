import { create } from "zustand";
import type { User } from "../../user/types/user-type";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";

interface AuthStore {
  token: string;
  user: User | null;
  isAuth: boolean;
  _hasHydrated: boolean;
  setAuth: (token: string, user: User) => void;
  updateUser: (user: User) => void;
  removeAuth: () => void;
  setHasHydrated: (state: boolean) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      user: null,
      isAuth: false,
      _hasHydrated: false,
      setAuth: (token, user) => set({ token, user, isAuth: true }),
      updateUser: (user) => set({ user }),
      removeAuth: () => set({ token: "", user: null, isAuth: false }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useAuthStore;

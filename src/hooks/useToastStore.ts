import { create } from "zustand";

interface ToastStore {
  isOpen: boolean;
  message: string;
  type: ToastTypes;
  showToast: (message: string, type: ToastTypes) => void;
  hideToast: () => void;
}

type ToastTypes = "success" | "error" | "info";

const useToastStore = create<ToastStore>((set) => ({
  isOpen: false,
  message: "",
  type: "success",
  showToast: (message: string, type: ToastTypes) =>
    set({ isOpen: true, message, type }),
  hideToast: () => set({ isOpen: false, message: "", type: "success" }),
}));

export default useToastStore;

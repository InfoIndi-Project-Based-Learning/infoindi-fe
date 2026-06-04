import type { ApiError } from "@/types/api";
import { AxiosError } from "axios";

export const getErrorMessage = (err: unknown) => {
  if (err instanceof AxiosError) {
    const response = err.response?.data as ApiError;
    return response.message || "Internal Server Error";
  }
};

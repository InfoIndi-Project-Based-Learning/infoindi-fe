import api from "@/lib/api";

import type {
  RegisterPayload,
  LoginPayload,
  AuthResponse,
} from "../types/auth-type";

export const loginService = async (payload: LoginPayload) => {
  return api.post<AuthResponse, LoginPayload>("/auth/login", payload);
};

export const registerService = async (payload: RegisterPayload) => {
  return api.post<AuthResponse, RegisterPayload>("/auth/register", payload);
};

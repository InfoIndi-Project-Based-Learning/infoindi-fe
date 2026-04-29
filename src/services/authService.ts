import {
  type AuthResponse,
  type LoginPayload,
  type RegisterPayload,
} from "../types/auth";
import apiService from "./baseService";

const registerService = async (payload: RegisterPayload) => {
  return apiService.post<AuthResponse, RegisterPayload>(
    "/auth/register",
    payload,
  );
};

const loginService = async (payload: LoginPayload) => {
  return apiService.post<AuthResponse, LoginPayload>("/auth/login", payload);
};
export { registerService, loginService };

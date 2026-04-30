import type z from "zod";
import type { User } from "./user";
import type { loginSchema, registerSchema } from "../libs/zod/authValidation";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;

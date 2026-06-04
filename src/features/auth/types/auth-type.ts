import type z from "zod";
import type { User } from "@/features/user/types/user-type";
import type { loginSchema, registerSchema } from "../schema/auth-schema";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  access_token?: string;
  token?: string;
}

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;

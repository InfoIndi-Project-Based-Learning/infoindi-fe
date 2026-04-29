import type { User } from "./user";

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

import { User } from "./user";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    type: string;
    token: string;
    user: User;
}

export type RegisterResponse = LoginResponse;
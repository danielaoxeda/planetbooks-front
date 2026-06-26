import api from "@/lib/axios";
import {
    LoginRequest,
    RegisterRequest,
    LoginResponse,
    RegisterResponse
} from "@/types/auth";

export const authService = {

    async login(data: LoginRequest): Promise<LoginResponse> {

        const response = await api.post(
            "/auth/login",
            data
        );

        return response.data;
    },

    async register(data: RegisterRequest): Promise<RegisterResponse> {

        const response = await api.post(
            "/auth/register",
            data
        );

        return response.data;
    }
};
import api from "@/lib/axios";
import {
    LoginRequest,
    RegisterRequest,
    LoginResponse
} from "@/types/auth";

export const authService = {

    async login(data: LoginRequest): Promise<LoginResponse> {

        const response = await api.post(
            "/auth/login",
            data
        );

        return response.data;
    },

    async register(data: RegisterRequest) {

        const response = await api.post(
            "/auth/register",
            data
        );

        return response.data;
    }
};
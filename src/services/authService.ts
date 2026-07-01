import api from "@/lib/axios";
import {
    LoginRequest,
    RegisterRequest,
    LoginResponse,
    ChangePasswordDTO
} from "@/types/auth";
import { User, UpdateUserDTO } from "@/types/user";

export const authService = {

    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>(
            "/auth/login",
            data
        );
        return response.data;
    },

    async register(data: RegisterRequest): Promise<User> {
        const response = await api.post<User>(
            "/auth/register",
            data
        );
        return response.data;
    },

    async updateProfile(id: number, data: UpdateUserDTO): Promise<User> {
        const response = await api.put<User>(`/v1/users/${id}`, data);
        return response.data;
    },

    async changePassword(id: number, data: ChangePasswordDTO): Promise<void> {
        // Forward all fields the backend may expect (including confirmPassword)
        await api.put(`/v1/users/${id}/password`, data);
    },

    async getMe(): Promise<User> {
        const response = await api.get<User>("/auth/me");
        return response.data;
    }
};
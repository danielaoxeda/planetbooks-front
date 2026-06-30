import api from "@/lib/axios";
import { User, UpdateUserDTO } from "@/types/user";
import { ChangePasswordDTO } from "@/types/auth";

export const UserService = {
    async getAll(): Promise<User[]> {
        const response = await api.get<User[]>("/v1/users");
        return response.data;
    },

    async getById(id: number): Promise<User> {
        const response = await api.get<User>(`/v1/users/${id}`);
        return response.data;
    },

    async getMe(): Promise<User> {
        const response = await api.get<User>("/auth/me");
        return response.data;
    },

    async update(id: number, userData: UpdateUserDTO): Promise<User> {
        const response = await api.put<User>(`/v1/users/${id}`, userData);
        return response.data;
    },

    async changePassword(id: number, passwordData: ChangePasswordDTO): Promise<void> {
        await api.put(`/v1/users/${id}/password`, passwordData);
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/v1/users/${id}`);
    },
};
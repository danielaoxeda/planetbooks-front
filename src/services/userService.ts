import api from "@/lib/axios";
import { User, UpdateUserDTO, UpdateUserRequest } from "@/types/user";
import { ChangePasswordDTO } from "@/types/auth";

export const userService = {
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

    async update(id: number, userData: UpdateUserDTO | UpdateUserRequest): Promise<User> {
        const response = await api.put<User>(`/v1/users/${id}`, userData);
        return response.data;
    },

    async changePassword(id: number, passwordData: ChangePasswordDTO): Promise<void> {
        await api.put(`/v1/users/${id}/password`, passwordData);
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/v1/users/${id}`);
    },

    async enable(id: number): Promise<void> {
        await api.patch(`/v1/users/${id}/enable`);
    },

    async disable(id: number): Promise<void> {
        await api.patch(`/v1/users/${id}/disable`);
    },

    async promote(id: number): Promise<void> {
        await api.patch(`/v1/users/${id}/promote`);
    },

    async demote(id: number): Promise<void> {
        await api.patch(`/v1/users/${id}/demote`);
    },
};

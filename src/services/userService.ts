import api from "@/lib/axios";
import { User, UpdateUserRequest } from "@/types/user";

export const userService = {

    async getAll(): Promise<User[]> {

        const response = await api.get("/v1/users");

        return response.data;

    },

    async getById(id: number): Promise<User> {

        const response = await api.get(`/v1/users/${id}`);

        return response.data;

    },

    async update(id: number, data: UpdateUserRequest): Promise<User> {

        const response = await api.put(`/v1/users/${id}`, data);

        return response.data;

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

    }

};
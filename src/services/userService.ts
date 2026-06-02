import { User } from "@/types/user";

export const UserService = {
    async getAll(): Promise<User[]> {
        return [];
    },

    async getById(id: number): Promise<User | null> {
        return null;
    },

    async create(user: Omit<User, "id">) {
        console.log("create", user);
    },

    async update(id: number, user: Partial<User>) {
        console.log("update", id, user);
    },

    async delete(id: number) {
        console.log("delete", id);
    },
};
export type UserRole = "ADMIN" | "USER";

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    enabled: boolean;

    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
}
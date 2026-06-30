export type UserRole = "ADMIN" | "USER";

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    enabled: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateUserRequest {
    name: string;
    email: string;
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

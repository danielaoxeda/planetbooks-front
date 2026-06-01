"use client";

import { useState } from "react";

import UserFilters from "@/components/admin/user/UserFilters";
import UserStats from "@/components/admin/user/UserStats";
import UserTable from "@/components/admin/user/UserTable";
import UserPagination from "@/components/admin/user/UserPagination";
import UserFormModal from "@/components/admin/user/UserFormModal";
import UserDeleteModal from "@/components/admin/user/UserDeleteModal";

import FooterCards from "@/components/admin/footer-cards/FooterCards";

import { User } from "@/types/user";

export default function UserPage() {
    const [users, setUsers] =
        useState<User[]>([
            {
                id: 1,
                name: "Elena Aris",
                email: "elena@planetbooks.com",
                role: "ADMIN",
                enabled: true,
                createdAt:
                    "2025-01-01",
            },
            {
                id: 2,
                name: "Marcus Thorne",
                email: "marcus@mail.com",
                role: "USER",
                enabled: true,
                createdAt:
                    "2025-02-15",
            },
            {
                id: 3,
                name: "Sarah Chen",
                email: "sarah@mail.com",
                role: "USER",
                enabled: false,
                createdAt:
                    "2025-03-10",
            },
        ]);

    const [search, setSearch] =
        useState("");

    const [currentPage, setCurrentPage] =
        useState(1);

    const [formOpen, setFormOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [selectedUser, setSelectedUser] =
        useState<User | null>(null);

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            role: "USER" as
                | "ADMIN"
                | "USER",
            enabled: true,
        });

    const handleChange = (
        field: string,
        value: string | boolean
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const openCreateModal = () => {
        setSelectedUser(null);

        setFormData({
            name: "",
            email: "",
            role: "USER",
            enabled: true,
        });

        setFormOpen(true);
    };

    const openEditModal = (
        user: User
    ) => {
        setSelectedUser(user);

        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            enabled: user.enabled,
        });

        setFormOpen(true);
    };

    const handleSave = () => {
        console.log(formData);

        setFormOpen(false);
    };

    const handleDelete = () => {
        console.log(
            "delete",
            selectedUser?.id
        );

        setDeleteOpen(false);
    };

    const filteredUsers =
        users.filter((user) =>
            user.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <>
            <UserFilters
                search={search}
                onSearchChange={
                    setSearch
                }
                onCreateUser={
                    openCreateModal
                }
            />

            <UserStats
                totalUsers={
                    users.length
                }
                activeUsers={
                    users.filter(
                        (u) =>
                            u.enabled
                    ).length
                }
                inactiveUsers={
                    users.filter(
                        (u) =>
                            !u.enabled
                    ).length
                }
                admins={
                    users.filter(
                        (u) =>
                            u.role ===
                            "ADMIN"
                    ).length
                }
            />

            <UserTable
                users={filteredUsers}
                onEdit={
                    openEditModal
                }
                onDelete={(user) => {
                    setSelectedUser(
                        user
                    );

                    setDeleteOpen(
                        true
                    );
                }}
            />

            <UserPagination
                currentPage={
                    currentPage
                }
                totalPages={3}
                onPageChange={
                    setCurrentPage
                }
            />

            <FooterCards />

            <UserFormModal
                open={formOpen}
                user={selectedUser}
                formData={formData}
                onClose={() =>
                    setFormOpen(false)
                }
                onChange={
                    handleChange
                }
                onSubmit={
                    handleSave
                }
            />

            <UserDeleteModal
                open={deleteOpen}
                user={selectedUser}
                onClose={() =>
                    setDeleteOpen(false)
                }
                onConfirm={
                    handleDelete
                }
            />
        </>
    );
}
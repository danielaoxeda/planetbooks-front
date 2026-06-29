"use client";

import { useEffect, useState } from "react";

import UserFilters from "@/components/admin/user/UserFilters";
import UserStats from "@/components/admin/user/UserStats";
import UserTable from "@/components/admin/user/UserTable";
import UserPagination from "@/components/admin/user/UserPagination";
import UserFormModal from "@/components/admin/user/UserFormModal";
import UserDeleteModal from "@/components/admin/user/UserDeleteModal";

import FooterCards from "@/components/admin/footer-cards/FooterCards";

import { User, UpdateUserRequest } from "@/types/user";

import { userService } from "@/services/userService";

export default function UserPage() {

    const [users, setUsers] = useState<User[]>([]);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [formOpen, setFormOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedUser, setSelectedUser] =
        useState<User | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "USER" as "ADMIN" | "USER",
        enabled: true,
    });

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const data = await userService.getAll();

            setUsers(data);

        } catch (error) {

            console.error(error);

            alert("Error loading users.");

        }

    };

    const handleChange = (
        field: string,
        value: string | boolean
    ) => {

        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

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

    const handleSave = async () => {

        if (!selectedUser) return;

        try {

            const data: UpdateUserRequest = {

                name: formData.name,
                email: formData.email,

            };

            await userService.update(
                selectedUser.id,
                data
            );

            await loadUsers();

            setFormOpen(false);

        } catch (error) {

            console.error(error);

            alert("Error saving user.");

        }

    };

    const handleDelete = async () => {

        if (!selectedUser) return;

        try {

            await userService.delete(selectedUser.id);

            await loadUsers();

            setDeleteOpen(false);

        } catch (error) {

            console.error(error);

            alert("Error deleting user.");

        }

    };

    const handleToggleStatus = async (
        user: User
    ) => {

        try {

            if (user.enabled) {

                await userService.disable(user.id);

            } else {

                await userService.enable(user.id);

            }

            await loadUsers();

        } catch (error) {

            console.error(error);

            alert("Error updating user status.");

        }

    };

    const filteredUsers = users.filter((user) =>
        user.name
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="w-full max-w-full p-3 sm:p-4 md:p-6 lg:p-8">

            <div className="w-full max-w-full space-y-4 sm:space-y-6">

                <UserFilters
                    search={search}
                    onSearchChange={setSearch}
                />

                <UserStats
                    totalUsers={users.length}
                    activeUsers={
                        users.filter(
                            (u) => u.enabled
                        ).length
                    }
                    inactiveUsers={
                        users.filter(
                            (u) => !u.enabled
                        ).length
                    }
                    admins={
                        users.filter(
                            (u) => u.role === "ADMIN"
                        ).length
                    }
                />

                <UserTable
                    users={filteredUsers}
                    onEdit={openEditModal}
                    onDelete={(user) => {

                        setSelectedUser(user);

                        setDeleteOpen(true);

                    }}
                    onToggleStatus={handleToggleStatus}
                />

                <UserPagination
                    currentPage={currentPage}
                    totalPages={1}
                    onPageChange={setCurrentPage}
                />

                <FooterCards />

            </div>

            <UserFormModal
                open={formOpen}
                user={selectedUser}
                formData={formData}
                onClose={() => setFormOpen(false)}
                onChange={handleChange}
                onSubmit={handleSave}
            />

            <UserDeleteModal
                open={deleteOpen}
                user={selectedUser}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
            />

        </div>

    );

}
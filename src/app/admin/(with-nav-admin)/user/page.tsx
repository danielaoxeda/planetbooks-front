"use client";

import { useEffect, useState } from "react";

import UserFilters from "@/components/admin/user/UserFilters";
import UserStats from "@/components/admin/user/UserStats";
import UserTable from "@/components/admin/user/UserTable";
import UserPagination from "@/components/admin/user/UserPagination";
import UserFormModal from "@/components/admin/user/UserFormModal";
import UserDeleteModal from "@/components/admin/user/UserDeleteModal";
import FooterCards from "@/components/admin/footer-cards/FooterCards";

import { User } from "@/types/user";
import { userService } from "@/services/userService";

export default function UserPage() {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [formOpen, setFormOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {

        try {

            setLoading(true);

            const data = await userService.getAll();

            setUsers(data);

        } catch (error) {

            console.error(error);

            alert("Error loading users.");

        } finally {

            setLoading(false);

        }

    }

    const handleChange = (
        field: string,
        value: string
    ) => {

        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

    };

    const openCreateModal = () => {

        setSelectedUser(null);

        setFormData({
            name: "",
            email: ""
        });

        setFormOpen(true);

    };

    const openEditModal = (user: User) => {

        setSelectedUser(user);

        setFormData({
            name: user.name,
            email: user.email
        });

        setFormOpen(true);

    };

    async function handleSave() {

        if (!selectedUser) return;

        try {

            await userService.update(
                selectedUser.id,
                formData
            );

            alert("User updated successfully.");

            setFormOpen(false);

            loadUsers();

        } catch (error) {

            console.error(error);

            alert("Error updating user.");

        }

    }

    async function handleDelete() {

        if (!selectedUser) return;

        try {

            await userService.delete(
                selectedUser.id
            );

            alert("User deleted successfully.");

            setDeleteOpen(false);

            loadUsers();

        } catch (error) {

            console.error(error);

            alert("Error deleting user.");

        }

    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(
            search.toLowerCase()
        )
    );

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                <h2 className="text-xl font-semibold">
                    Loading users...
                </h2>

            </div>

        );

    }

    return (

        <div className="w-full max-w-full p-3 sm:p-4 md:p-6 lg:p-8">

            <div className="space-y-6">

                <UserFilters
                    search={search}
                    onSearchChange={setSearch}
                    onCreateUser={openCreateModal}
                />

                <UserStats
                    totalUsers={users.length}
                    activeUsers={
                        users.filter(
                            u => u.enabled
                        ).length
                    }
                    inactiveUsers={
                        users.filter(
                            u => !u.enabled
                        ).length
                    }
                    admins={
                        users.filter(
                            u => u.role === "ADMIN"
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
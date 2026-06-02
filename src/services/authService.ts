type AuthCredentials = {
    email: string
    password: string
}

type AuthRegistrationData = {
    name: string
    email: string
    password: string
}

type StoredUser = AuthRegistrationData & {
    role: 'ADMIN' | 'USER'
}

type ProfileUpdateData = {
    name: string
    email: string
    password?: string
}

type PasswordChangeData = {
    newPassword: string
}

const INITIAL_USERS: StoredUser[] = [
    { name: "Anthony", email: "admin@planetbooks.com", password: "123", role: "ADMIN" },
    { name: "Max", email: "estudiante@utp.edu.pe", password: "123", role: "USER" },
    { name: "Zeus", email: "Zeus@planetbooks.com", password: "123", role: "USER" }
];

const readUsers = (): StoredUser[] => JSON.parse(localStorage.getItem('pb_users_db') || '[]') as StoredUser[]

const saveUsers = (users: StoredUser[]) => {
    localStorage.setItem('pb_users_db', JSON.stringify(users))
}

export const authService = {
    initDB: () => {
        if (!localStorage.getItem('pb_users_db')) {
            localStorage.setItem('pb_users_db', JSON.stringify(INITIAL_USERS));
        }
    },

    login: async (credentials: AuthCredentials) => {
        authService.initDB();
        await new Promise(res => setTimeout(res, 600));
        const users = readUsers();
        const found = users.find((u) => u.email === credentials.email && u.password === credentials.password);

        if (found) {
            return { name: found.name, email: found.email, role: found.role };
        }
        throw new Error("Invalid credentials.");
    },

    register: async (userData: AuthRegistrationData) => {
        authService.initDB();
        await new Promise(res => setTimeout(res, 600));
        const users = readUsers();

        if (users.find((u) => u.email === userData.email)) {
            throw new Error("This email is already registered.");
        }

        users.push({ ...userData, role: 'USER' });
        saveUsers(users);
        return { success: true };
    },

    updateProfile: async (currentEmail: string, profileData: ProfileUpdateData) => {
        authService.initDB();
        await new Promise(res => setTimeout(res, 450));

        const users = readUsers();
        const targetIndex = users.findIndex((user) => user.email === currentEmail);

        if (targetIndex === -1) {
            throw new Error('User not found.');
        }

        const duplicateEmail = users.find(
            (user, index) => user.email === profileData.email && index !== targetIndex,
        );

        if (duplicateEmail) {
            throw new Error('This email is already registered.');
        }

        const currentUser = users[targetIndex];
        const updatedUser: StoredUser = {
            ...currentUser,
            name: profileData.name,
            email: profileData.email,
            password: profileData.password?.trim() ? profileData.password : currentUser.password,
        };

        users[targetIndex] = updatedUser;
        saveUsers(users);

        return { name: updatedUser.name, email: updatedUser.email, role: updatedUser.role };
    },

    changePassword: async (email: string, data: PasswordChangeData) => {
        authService.initDB();
        await new Promise(res => setTimeout(res, 450));

        const users = readUsers();
        const targetIndex = users.findIndex((user) => user.email === email);

        if (targetIndex === -1) {
            throw new Error('User not found.');
        }

        const currentUser = users[targetIndex];

        if (data.newPassword === currentUser.password) {
            throw new Error('The new password matches the current password.');
        }

        users[targetIndex] = {
            ...currentUser,
            password: data.newPassword,
        };

        saveUsers(users);

        return { name: currentUser.name, email: currentUser.email, role: currentUser.role };
    }
};
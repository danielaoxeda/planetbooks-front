const INITIAL_USERS = [
    { name: "Anthony", email: "admin@planetbooks.com", password: "123", role: "ADMIN" },
    { name: "Max", email: "estudiante@utp.edu.pe", password: "123", role: "USER" },
    { name: "Zeus", email: "Zeus@planetbooks.com", password: "123", role: "USER" }
];

export const authService = {
    initDB: () => {
        if (!localStorage.getItem('pb_users_db')) {
            localStorage.setItem('pb_users_db', JSON.stringify(INITIAL_USERS));
        }
    },

    login: async (credentials: any) => {
        authService.initDB();
        await new Promise(res => setTimeout(res, 600));
        const users = JSON.parse(localStorage.getItem('pb_users_db') || '[]');
        const found = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);

        if (found) {
            // Retornamos también el nombre para el saludo
            return { name: found.name, email: found.email, role: found.role };
        }
        throw new Error("Invalid credentials.");
    },

    register: async (userData: any) => {
        authService.initDB();
        await new Promise(res => setTimeout(res, 600));
        const users = JSON.parse(localStorage.getItem('pb_users_db') || '[]');

        if (users.find((u: any) => u.email === userData.email)) {
            throw new Error("This email is already registered.");
        }

        // Guardamos el objeto completo (incluyendo name)
        users.push({ ...userData, role: 'USER' });
        localStorage.setItem('pb_users_db', JSON.stringify(users));
        return { success: true };
    }
};
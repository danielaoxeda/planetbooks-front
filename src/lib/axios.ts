import axios from "axios";
import {API_URL} from "@/lib/api";

const api =
    axios.create({
        baseURL: API_URL,
        headers: {
            "Content-Type": "application/json"
        }
    });

// Add Authorization header from localStorage
api.interceptors.request.use(
    (config) => {
        try {
            const session = localStorage.getItem("pb_session");
            if (session) {
                const { token } = JSON.parse(session);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        } catch (error) {
            // Silently fail if localStorage is not available
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
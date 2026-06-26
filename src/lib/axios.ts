import axios from "axios";
import {API_URL} from "@/lib/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Attach Authorization header from localStorage if available (client-side only)
if (typeof window !== "undefined") {
    api.interceptors.request.use(
        (config) => {
            try {
                const saved = localStorage.getItem("pb_session");
                if (saved) {
                    const token = (JSON.parse(saved) as { token?: string }).token;
                    if (token && config.headers) {
                        config.headers = {
                            ...config.headers,
                            Authorization: `Bearer ${token}`,
                        };
                    }
                }
            } catch {}
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error?.response?.status === 401) {
                try {
                    localStorage.removeItem("pb_session");
                    window.location.href = "/login";
                } catch {}
            }
            return Promise.reject(error);
        }
    );
}

export default api;
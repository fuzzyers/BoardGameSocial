import { api } from "./api";
import { saveToken } from "./auth";

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post("/auth/login", { email, password });

        await saveToken(response.headers.authorization);

        return response.data;

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};
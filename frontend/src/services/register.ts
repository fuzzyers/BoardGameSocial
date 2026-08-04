import {api} from "./api";
import { saveToken } from "./auth";

export const register = async (name: string, email: string, username: string, password: string, confirmPassword: string) => {
    try {
        const response = await api.post("/auth/register", { name, email, username, password, confirmPassword });
        
        await saveToken(response.headers.authorization);

        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};
import {api} from "./api";

export const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    try {
        const response = await api.post("/auth/register", { name, email, password, confirmPassword });
        
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};
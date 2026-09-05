import { auth } from "@/config/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { api } from "./api";

export const getToken = async (): Promise<string | null> => {
    const user = auth.currentUser;

    if (!user) {
        return null;
    }

    return await user.getIdToken();
};

export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);

        const response = await api.get("/auth/firebase-user");

        return {
            authenticated: true,
            hasAccount: true,
            user: response.data,
        };
    } catch (error: any) {
        if (error.response?.status === 404 || error.response?.status === 401) {
            return {
                authenticated: true,
                hasAccount: false,
            };
        }

        console.error("Google login failed:", error);
        throw error;
    }
};

export const createFirebaseUser = async (username: string) => {
    try {
        const response = await api.post("/auth/firebase-login", {
            username,
        });

        return response.data;
    } catch (error) {
        console.error("Error creating Firebase user:", error);
        throw error;
    }
};

export const logout = async () => {
    await signOut(auth);
};

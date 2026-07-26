import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string): Promise<void> => {

    if (!token) {
        throw new Error("Token is undefined or null");
    }

    const Newtoken = token.split(" ")[1]; 
    await AsyncStorage.setItem("authToken", Newtoken);
};

export const getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem("authToken");
};

export const deleteToken = async (): Promise<void> => {
    await AsyncStorage.removeItem("authToken");
};
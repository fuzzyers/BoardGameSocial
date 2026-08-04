import { User } from "@/types/apiDataTypes";
import { api } from "./api";

const SearchUsers = async (searchTerm: string, groupId: number): Promise<User[]> => {
    try {
        const response = await api.get(`/users/search?name=${searchTerm}&groupId=${groupId}`);

        const data: User[] = await response.data;

        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }   
};

export default SearchUsers;
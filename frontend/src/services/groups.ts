import { api } from "./api";

export const createGroup = async (name: string, description: string) => {
    try {
        const response = await api.post("/groups/create",{ name, description });
        return response;
    } catch (error) {
        console.log(error);
    }
};

// This will get all groups the user is in
export const getGroups = async () => {
    try {
        const response = await api.get("/groups");
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export const addUserToGroup = async (groupId: number, userId: number) => {
    try {
        const response = await api.put(`/groups/addUser`, { groupId, userId, roleId: 3 });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const removeUserFromGroup = async (groupId: number, userId: number) => {
    try {
        const response = await api.put(`/groups/removeUser`,{ groupId, userId });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deleteGroup = async (groupId: number) => {
    try {
        const response = await api.delete(`/groups/${groupId}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

import { api } from "./api"
import { getToken } from "./auth"

export const createGroup = async (name: string, description: string) => {
    try {
        const token = await getToken()
        console.log("Token:", token)
        const response = await api.post("/groups/create", {name, description},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log("Response:", response)
        return response
    } catch (error) {
        console.log(error)
    }
}

// This will get all groups the user is in
export const getGroups = async () => {
    try {
        const token = await getToken()
        const response = await api.get("/groups", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export const addUserToGroup = async (groupId: number, userId: number) => {
    try {
        const token = await getToken()
        const response = await api.put(`/groups/addUser`, { groupId, userId, roleId: 3 }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export const removeUserFromGroup = async (groupId: number, userId: number) => {
    try {
        const token = await getToken()
        const response = await api.put(`/groups/removeUser`, { groupId, userId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export const deleteGroup = async (groupId: number) => {
    try {
        const token = await getToken()
        const response = await api.delete(`/groups/${groupId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}
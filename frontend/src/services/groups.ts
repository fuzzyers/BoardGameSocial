import { api } from "./api"
import { getToken } from "./auth"

export const createGroup = async (name: string, description: string) => {
    try {
        const token = await getToken()

        const response = await api.post("/groups/create", {name, description},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

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
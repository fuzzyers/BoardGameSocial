import { api } from "./api"


export const SearchBGG = async (search: string) => {
    const response = await api.post(`/bgg/search/${search}`)
}
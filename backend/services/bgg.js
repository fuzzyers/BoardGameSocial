import { parseSearchByIdResults, parseSearchResults } from "../utils/xmlparsing.js"
import { bggApi } from "../config/bggApi.js"

export const searchBGGGame = async (search) => {
    const response = await bggApi.get("/search", {
        params: {
            query: search
        }
    })

    const parsedData = await parseSearchResults(response.data)
    return parsedData
}

export const searchBGGGameById = async (id) => {
    const response = await bggApi.get(`thing?id=${id}`)

    const parsedData = await parseSearchByIdResults(response.data)

    return parsedData
}

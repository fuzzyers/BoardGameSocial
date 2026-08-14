import { searchBGGGame, searchBGGGameById } from "../services/bgg.js";

export const searchBggForGame = async (req, res) => {
    const { search } = req.params
    try {   

        const response = await searchBGGGame(search)

        res.status(201).json({ message: "success", results: response });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    }
}

export const searchBggById = async (req, res) => {
    const { id } = req.params
    try {
        const response = await searchBGGGameById(id)

        res.status(201).json({ message: "success", results: response });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    }
}
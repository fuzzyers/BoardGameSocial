import { eventGameResult, insertGameScores, removeGameScore } from "../services/eventScoring.js";

export const insertScoreForPlayer = async (req, res) => {
    try {
        const { event_id, user_id, game_id, score, placement, game_weight } = req.body;

        const checkIfGamesInEvent = await eventGameResult(event_id, game_id);

        if (checkIfGamesInEvent.rows.length === 0) {
            return res.status(404).json({
                message: "Game is not part of this event",
            });
        }

        const eventGameId = checkIfGamesInEvent.rows[0].id;
        let leaderboard_points = 0;

        if (placement === 1) leaderboard_points = 3 * game_weight;
        if (placement === 2) leaderboard_points = 2 * game_weight;
        if (placement === 3) leaderboard_points = 1 * game_weight;

        const results = await insertGameScores(eventGameId, user_id, score, placement, leaderboard_points);

        res.status(201).json({ message: "success", data: results });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};

export const removePlayerScore = async (req, res) => {
    try {
        const { event_id, user_id, game_id } = req.body;

        const checkIfGamesInEvent = await eventGameResult(event_id, game_id);

        if (checkIfGamesInEvent.rows.length === 0) {
            return res.status(404).json({
                message: "Game is not part of this event",
            });
        }

        const eventGameId = checkIfGamesInEvent.rows[0].id;

        const result = await removeGameScore(eventGameId, user_id);

        if (!result) {
            return res.status(404).json({
                message: "Player score not found",
            });
        }

        return res.status(200).json({
            message: "Player removed from game results",
            result,
        });
    } catch (error) {
        console.error("Failed to remove player score:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

import { addPollOptionQuery, createPollQuery, createPollVote, getPollByIdQuery } from "../services/poll.js";

export const createPoll = async (req, res) => {
    try {
        const { event_id, created_by, question, multiple_choice, anonymous, expires_at, closed_at } = req.body;

        const response = await createPollQuery(event_id, created_by, question, multiple_choice, anonymous, expires_at, closed_at);

        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const votePoll = async (req, res) => {
    try {
        const { poll_id, option_id } = req.body;
        const user_id = req.user.id;

        if (!poll_id || !option_id) {
            return res.status(400).json({
                message: "poll_id and option_id are required",
            });
        }

        const vote = await createPollVote(poll_id, option_id, user_id);

        return res.status(201).json(vote);
    } catch (error) {
        console.error("Failed to vote on poll:", error);

        return res.status(500).json({
            message: "Failed to vote on poll",
        });
    }
};

export const addOptionToPoll = async (req, res) => {
    try {
        const { poll_id, game_id } = req.body;

        if (!poll_id || !game_id) {
            return res.status(400).json({
                message: "Poll ID and game ID are required.",
            });
        }
        console.log("Test");
        const poll = await getPollByIdQuery(poll_id);

        if (!poll) {
            return res.status(404).json({
                message: "Poll not found.",
            });
        }

        const option = await addPollOptionQuery(poll_id, game_id);

        if (!option) {
            return res.status(409).json({
                message: "This game is already an option in this poll.",
            });
        }

        return res.status(201).json(option);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to add option to poll.",
        });
    }
};

import {
    addGameToEventQuery,
    createEventQuery,
    deleteEventByIdQuery,
    getEventsQuery,
    getEventWithGamesQuery,
} from "../services/events.js";
import { createPollQuery } from "../services/poll.js";

export const createEvent = async (req, res) => {
    const { group_id, name, description, location, event_date } = req.body;
    const user_id = req.user.id;

    try {
        const response = await createEventQuery(group_id, name, description, location, event_date);

        const poll = await createPollQuery(
            response.id,
            user_id,
            "What games do we want to play",
            true,
            false,
            response.event_date
        );

        console.log(poll);
        res.status(201).json({ message: "success", results: response });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    }
};

export const getEvents = async (req, res) => {
    try {
        const response = await getEventsQuery();

        res.status(201).json({ message: "success", results: response });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    }
};

export const addEventGame = async (req, res) => {
    const { event_id, game_id } = req.body;
    try {
        const response = await addGameToEventQuery(event_id, game_id);

        res.status(201).json({ message: "success", results: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    }
};

export const getEventWithGames = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getEventWithGamesQuery(id);

        res.status(201).json({ message: "success", results: response });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    }
};

export const deleteEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteEventByIdQuery(id);

        res.status(201).json({ message: "success", results: response });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    }
};

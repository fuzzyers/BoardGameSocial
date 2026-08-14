import { createEventQuery, getEventsQuery } from "../services/events.js";

export const createEvent = async (req, res) => {
    const { group_id, name, description, location, event_date } = req.body;

    try {
        const response = await createEventQuery(group_id, name, description, location, event_date);

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

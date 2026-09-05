import {
    addGameToEventQuery,
    createEventQuery,
    deleteEventByIdQuery,
    getEventsQuery,
    getEventWithGamesQuery,
} from "../services/events.js";
import { createPollQuery } from "../services/poll.js";
import pool from "../db/db.js";

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
        const user_id = req.user.id;

        const response = await getEventsQuery(user_id);

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

export const toggleEventAttendance = async (req, res) => {
    const { event_id, user_id } = req.body;

    try {
        // Check that the event exists and get its group
        const eventResult = await pool.query(
            `
            SELECT group_id
            FROM events
            WHERE id = $1
            `,
            [event_id]
        );

        if (eventResult.rows.length === 0) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        const groupId = eventResult.rows[0].group_id;

        // Check that the target user is a member of the event's group
        const memberResult = await pool.query(
            `
            SELECT 1
            FROM group_members
            WHERE group_id = $1
            AND user_id = $2
            `,
            [groupId, user_id]
        );

        if (memberResult.rows.length === 0) {
            return res.status(403).json({
                message: "User is not a member of this group",
            });
        }

        // Check whether attendance already exists
        const attendanceResult = await pool.query(
            `
            SELECT 1
            FROM event_players
            WHERE event_id = $1
            AND user_id = $2
            `,
            [event_id, user_id]
        );

        // Currently attending -> remove
        if (attendanceResult.rows.length > 0) {
            await pool.query(
                `
                DELETE FROM event_players
                WHERE event_id = $1
                AND user_id = $2
                `,
                [event_id, user_id]
            );

            return res.status(200).json({
                message: "Attendance removed",
                attending: false,
            });
        }

        // Not attending -> add
        await pool.query(
            `
            INSERT INTO event_players (event_id, user_id)
            VALUES ($1, $2)
            `,
            [event_id, user_id]
        );

        return res.status(200).json({
            message: "Attendance added",
            attending: true,
        });
    } catch (error) {
        console.error("Toggle event attendance error:", error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
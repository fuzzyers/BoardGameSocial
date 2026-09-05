import { api } from "./api";

type CreateEventData = {
    group_id: number;
    name: string;
    description: string;
    location: string;
    event_date: string;
};

export const createEvent = async (data: CreateEventData) => {
    const response = await api.post("/events/create", data);

    return response.data;
};

export const getEvents = async () => {
    const response = await api.get("/events/");

    return response.data;
};

export const getEventById = async (event_id: string | string[]) => {
    const response = await api.get(`/events/${event_id}`);

    return response.data.results;
};

export const addGameToEvent = async (gameId: number, eventId: number, group_id: number) => {
    const response = await api.post("/events/addGameToEvent", {
        event_id: eventId,
        game_id: gameId,
        group_id: group_id,
    });

    return response;
};

export const addGameToEventPoll = async (gameId: number, poll_id: number) => {
    const response = await api.post("/poll/option", {
        poll_id: poll_id,
        game_id: gameId,
    });

    return response;
};

export const voteForGame = async (poll_id: number, option_id: number | null) => {
    const response = await api.post("/poll/vote", {
        poll_id: poll_id,
        option_id: option_id,
    });

    return response;
};

export const deleteEvent = async (group_id: number, event_id: number) => {
    const response = await api.delete(`/events/${event_id}`, {
        data: {
            group_id: group_id,
        },
    });

    return response;
};

export const toggleAttendance = async (event_id: number, user_id: number) => {
    const response = await api.put("/events/attendingEvent", {
        event_id: event_id,
        user_id: user_id
    })

    return response
}
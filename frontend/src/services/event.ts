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
    const response = await api.get(`/events/${event_id}`)

    return response.data.results[0]
}

export const addGameToEvent = async (gameId: number, eventId: number) => {
    const response = await api.post("/events/addGameToEvent", {
        event_id: eventId,
        game_id: gameId
    })

    return response
}
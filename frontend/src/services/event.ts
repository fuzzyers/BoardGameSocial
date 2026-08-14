import { api } from "./api";

type CreateEventData = {
    group_id: number;
    name: string;
    description: string;
    location: string;
    event_date: string;
};

export const createEvent = async (data: CreateEventData) => {
    const response = await api.post("event/create", data);

    return response.data;
};

export const getEvents = async () => {
    const response = await api.get("events/");

    return response.data;
};

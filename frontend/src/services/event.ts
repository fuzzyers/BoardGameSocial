import { api } from "./api";
import { getToken } from "./auth";

type CreateEventData = {
    group_id: number;
    name: string;
    description: string;
    location: string;
    event_date: string;
};

export const createEvent = async (data: CreateEventData) => {
    const token = await getToken();
    const response = await api.post("event/create", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const getEvents = async () => {
    const token = await getToken();
    const response = await api.get("events/", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

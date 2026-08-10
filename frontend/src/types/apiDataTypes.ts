// Standardized type for a group object
export type Group = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    chat_id: number;
};

// Standardized type for a message object
export type Message = {
    id: number;
    sender_name: string;
    message: string;
    created_at: Date;
};

export type User = {
    id: number;
    name: string;
    email: string;
    username: string;
    role: string;
};

export type GroupDetails = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    chat_id: number;
    members: User[];
    messages: Message[];
};

export type Game = {
    id: number;
    title: string;
    description: string | null;
    bgg_id: number | null;
    year_published: number | null;
    min_players: number;
    max_players: number;
    min_play_time: number;
    max_play_time: number;
    min_age: number | null;
    review_status: string;
};

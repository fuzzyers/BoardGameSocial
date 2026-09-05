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
    average_rating: number | null;
    avg_weight: number | null;
    submitted_by: number;
    created_at: string;
    expansions: Game[];
};

export type Event = {
    id: number;
    description: string;
    group_id: number;
    location: string;
    name: string;
    event_date: string;
    created_at: string;
    members: Members[];
};

export type EventWithGames = Event & {
    games: Game[];
    polls: PollType[];
};

export type PollType = {
    id: number;
    anonymous: boolean;
    closed_at: string | null;
    created_at: string;
    expires_at: string;
    multiple_choices: boolean;
    question: string;
    options: PollOption[];
    total_votes: number;
};

export type PollOption = {
    id: number;
    poll_id: number;
    game_id: number;
    created_at: string;
    title: string;
    votes: number;
};

export type ProfileData = {
    description: string;
    email: string;
    events_count: string;
    game_count: string;
    group_count: string;
    id: number;
    name: string;
    role: string;
    username: string;
};

export type Members = {
    id: number;
    username: string;
    name: string;
    attending: boolean;
};

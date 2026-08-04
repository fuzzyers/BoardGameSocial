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
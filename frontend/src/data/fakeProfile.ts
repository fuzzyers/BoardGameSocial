export type ProfileGame = {
    id: number;
    title: string;
    image?: string;
};

export type Profile = {
    id: number;
    username: string;
    name: string;
    bio: string;
    avatar?: string;
    joined: string;
    stats: {
        games: number;
        events: number;
        groups: number;
    };
    games: ProfileGame[];
};

export const fakeProfiles: Profile[] = [
    {
        id: 1,
        username: "jackson",
        name: "Jackson Williamson",
        bio: "Board game enthusiast and miniature wargamer.",
        avatar: undefined,
        joined: "2025-03-12",
        stats: {
            games: 42,
            events: 18,
            groups: 5,
        },
        games: [
            {
                id: 1,
                title: "Gloomhaven",
            },
            {
                id: 2,
                title: "Star Wars: Imperial Assault",
            },
            {
                id: 3,
                title: "Undaunted: North Africa",
            },
            {
                id: 4,
                title: "Root",
            },
        ],
    },
    {
        id: 2,
        username: "alex",
        name: "Alex Smith",
        bio: "Always up for a game night.",
        avatar: undefined,
        joined: "2025-06-21",
        stats: {
            games: 27,
            events: 9,
            groups: 3,
        },
        games: [
            {
                id: 5,
                title: "Terraforming Mars",
            },
            {
                id: 6,
                title: "Wingspan",
            },
            {
                id: 7,
                title: "Scythe",
            },
        ],
    },
];

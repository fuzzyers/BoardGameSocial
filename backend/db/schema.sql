DROP TABLE IF EXISTS
    game_scores,
    event_games,
    event_players,
    game_images,
    game_versions,
    game_expansions,
    game_publishers,
    publishers,
    game_designers,
    designers,
    game_mechanics,
    mechanics,
    game_categories,
    categories,
    messages,
    group_chats,
    group_members,
    user_games,
    events,
    groups,
    games,
    users,
    group_roles,
    roles,
    polls,
    poll_options,
    poll_votes
CASCADE;


-- =========================
-- User Roles
-- =========================

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO roles(name)
VALUES
('user'),
('admin');


CREATE TABLE group_roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO group_roles(name)
VALUES
('owner'),
('admin'),
('member');


-- =========================
-- Users
-- =========================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,

    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,

    password VARCHAR(255) NOT NULL,

    role_id INT NOT NULL REFERENCES roles(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================
-- Games
-- =========================

CREATE TABLE games (
    id SERIAL PRIMARY KEY,

    title VARCHAR(255) NOT NULL,
    description TEXT,

    bgg_id INT UNIQUE,

    year_published INT,

    min_players INT NOT NULL,
    max_players INT NOT NULL,

    min_play_time INT NOT NULL,
    max_play_time INT NOT NULL,

    min_age INT,

    primary_image_url TEXT,

    average_rating FLOAT,
    avg_weight FLOAT,


    -- Moderation

    review_status VARCHAR(30)
        DEFAULT 'pending'
        CHECK (
            review_status IN
            (
                'pending',
                'approved',
                'rejected',
                'imported'
            )
        ),

    submitted_by INT REFERENCES users(id),
    reviewed_by INT REFERENCES users(id),

    reviewed_at TIMESTAMP,


    -- External syncing

    last_synced TIMESTAMP,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================
-- Expansions
-- =========================

CREATE TABLE game_expansions (
    base_game_id INT REFERENCES games(id) ON DELETE CASCADE,
    expansion_id INT REFERENCES games(id) ON DELETE CASCADE,

    PRIMARY KEY(base_game_id, expansion_id),

    CHECK(base_game_id <> expansion_id)
);



-- =========================
-- Game Images
-- =========================

CREATE TABLE game_images (
    id SERIAL PRIMARY KEY,

    game_id INT REFERENCES games(id) ON DELETE CASCADE,

    url TEXT NOT NULL,

    caption TEXT,

    sort_order INT DEFAULT 0
);



-- =========================
-- Game Versions
-- =========================

CREATE TABLE game_versions (
    id SERIAL PRIMARY KEY,

    game_id INT REFERENCES games(id) ON DELETE CASCADE,

    publisher VARCHAR(255),

    language VARCHAR(50),

    release_year INT,

    bgg_version_id INT UNIQUE
);



-- =========================
-- Designers
-- =========================

CREATE TABLE designers (
    id SERIAL PRIMARY KEY,

    name VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE game_designers (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    designer_id INT REFERENCES designers(id) ON DELETE CASCADE,

    PRIMARY KEY(game_id, designer_id)
);



-- =========================
-- Publishers
-- =========================

CREATE TABLE publishers (
    id SERIAL PRIMARY KEY,

    name VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE game_publishers (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    publisher_id INT REFERENCES publishers(id) ON DELETE CASCADE,

    PRIMARY KEY(game_id, publisher_id)
);



-- =========================
-- Mechanics
-- =========================

CREATE TABLE mechanics (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE game_mechanics (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    mechanic_id INT REFERENCES mechanics(id) ON DELETE CASCADE,

    PRIMARY KEY(game_id, mechanic_id)
);



-- =========================
-- Categories
-- =========================

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) UNIQUE NOT NULL
);


CREATE TABLE game_categories (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,

    PRIMARY KEY(game_id, category_id)
);



-- =========================
-- User Collections
-- =========================

CREATE TABLE user_games (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,

    game_id INT REFERENCES games(id) ON DELETE CASCADE,


    collection_status VARCHAR(30)
        DEFAULT 'owned'
        CHECK(
            collection_status IN
            (
                'owned',
                'wishlist',
                'played',
                'sold'
            )
        ),


    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    PRIMARY KEY(user_id, game_id)
);



-- =========================
-- Groups
-- =========================

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    description TEXT,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE group_members (
    group_id INT REFERENCES groups(id) ON DELETE CASCADE,

    user_id INT REFERENCES users(id) ON DELETE CASCADE,


    role_id INT NOT NULL REFERENCES group_roles(id),


    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    PRIMARY KEY(group_id, user_id)
);



-- =========================
-- Chat
-- =========================

CREATE TABLE group_chats (
    id SERIAL PRIMARY KEY,

    group_id INT UNIQUE REFERENCES groups(id)
    ON DELETE CASCADE
);



CREATE TABLE messages (
    id SERIAL PRIMARY KEY,


    chat_id INT REFERENCES group_chats(id)
    ON DELETE CASCADE,


    user_id INT REFERENCES users(id)
    ON DELETE CASCADE,


    message TEXT NOT NULL,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- =========================
-- Events / Game Nights
-- =========================

CREATE TABLE events (
    id SERIAL PRIMARY KEY,


    group_id INT REFERENCES groups(id)
    ON DELETE CASCADE,


    name VARCHAR(255) NOT NULL,

    description TEXT,

    location VARCHAR(255),

    event_date TIMESTAMP NOT NULL,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE event_players (
    event_id INT REFERENCES events(id)
    ON DELETE CASCADE,


    user_id INT REFERENCES users(id)
    ON DELETE CASCADE,


    PRIMARY KEY(event_id,user_id)
);

CREATE TABLE event_games (
    id SERIAL PRIMARY KEY,

    event_id INT REFERENCES events(id)
    ON DELETE CASCADE,

    game_id INT REFERENCES games(id)
    ON DELETE CASCADE
);

CREATE TABLE game_scores (
    event_game_id INT REFERENCES event_games(id)
        ON DELETE CASCADE,

    user_id INT REFERENCES users(id)
        ON DELETE CASCADE,

    score INT NOT NULL,

    placement INT NOT NULL
        CHECK (placement >= 0),

    leaderboard_points NUMERIC(6,2) NOT NULL DEFAULT 0.00
        CHECK (leaderboard_points >= 0),

    PRIMARY KEY(event_game_id, user_id)
);

CREATE TABLE polls (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    created_by INTEGER NOT NULL REFERENCES users(id),
    question TEXT NOT NULL,
    multiple_choice BOOLEAN NOT NULL DEFAULT FALSE,
    anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMPTZ,
    closed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE poll_options (
    id SERIAL PRIMARY KEY,
    poll_id INTEGER NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
    game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (poll_id, game_id)
);

CREATE TABLE poll_votes (
    id SERIAL PRIMARY KEY,
    poll_id INTEGER NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
    option_id INTEGER NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE (poll_id, option_id, user_id)
);

ALTER TABLE users
ADD COLUMN description TEXT;
ALTER TABLE users
ADD COLUMN firebase_uid TEXT UNIQUE;
ALTER TABLE users
ALTER COLUMN password DROP NOT NULL;
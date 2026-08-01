DROP TABLE IF EXISTS
    game_scores,
    event_games,
    event_players,
    messages,
    group_chats,
    group_members,
    user_games,
    events,
    groups,
    games,
    users
CASCADE;

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO roles (name)
VALUES
    ('user'),
    ('admin');

CREATE TABLE group_roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO group_roles (name)
VALUES
    ('owner'),
    ('admin'),
    ('member');

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL REFERENCES roles(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  min_players INT NOT NULL,
  max_players INT NOT NULL,
  min_play_time INT NOT NULL,
  max_play_time INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Groups table to allow users to create groups and invite other users to join
-- A groups table will have a name and a description, and a created_at timestamp.
-- A group can have many users, and a user can belong to many groups. This is a many-to-many relationship, so we will need a connecting table for groups and users.
-- A groups table will also have events, which will be stored in a separate table. An event will have a name, a description, a date and time, and a location. An event can have many users, and a user can belong to many events. This is also a many-to-many relationship, so we will need a connecting table for events and users.
-- A group will also have group messaging
CREATE TABLE IF NOT EXISTS groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Events Table
-- An Event will consist of a group of players
-- 1 or More Games
-- Scores for those Games
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  group_id INT NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  event_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messaging Table
-- 

CREATE TABLE IF NOT EXISTS group_chats (
    id SERIAL PRIMARY KEY,
    group_id INT REFERENCES groups(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    chat_id INT REFERENCES group_chats(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_scores (
    event_game_id INT REFERENCES event_games(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    score INT NOT NULL,
    PRIMARY KEY (event_game_id, user_id)
);

-- connecting table for users and games to show ownership of games by users
CREATE TABLE IF NOT EXISTS user_games (
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  game_id INT REFERENCES games(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, game_id)
);

CREATE TABLE group_members (
    group_id INT REFERENCES groups(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    role_id INT NOT NULL REFERENCES group_roles(id),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (group_id, user_id)
);

CREATE TABLE IF NOT EXISTS event_players (
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, user_id)
);

CREATE TABLE IF NOT EXISTS event_games (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    play_order INT
);


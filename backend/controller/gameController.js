import * as gamesService from "../services/games.js";

export const createGame = async (req, res) => {
    const { title, description, bgg_id, year_published, min_players, max_players, min_play_time, max_play_time, min_age } =
        req.body.game;
    const submitted_by = req.user.id;

    try {
        const game = await gamesService.createGame({
            title,
            description,
            bgg_id,
            year_published,
            min_players,
            max_players,
            min_play_time,
            max_play_time,
            min_age,
            submitted_by
        });

        res.status(201).json(game);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getGames = async (req, res) => {
    const games = await gamesService.getGames();

    res.json(games);
};

export const getGame = async (req, res) => {
    const game = await gamesService.getGameById(req.params.id);

    res.json(game);
};

export const searchGames = async (req, res) => {
    const games = await gamesService.searchGames(req.query.q);

    res.json(games);
};

export const updateGame = async (req, res) => {
    const game = await gamesService.updateGame(req.params.id, req.body);

    res.json(game);
};

export const deleteGame = async (req, res) => {
    await gamesService.deleteGame(req.params.id);

    res.sendStatus(204);
};

export const approveGame = async (req, res) => {
    const game = await gamesService.approveGame(req.params.id, req.user.id);

    res.json(game);
};

export const getCollection = async (req, res) => {
    try {
        const user_id = req.user.id;

        const games = await gamesService.getUserCollection(user_id);

        res.status(201).json({ data: games });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const addGameToCollection = async (req, res) => {
    try {
        const { game_id } = req.body;
        const user_id = req.user.id;
        // console.log(user_id)

        const game = await gamesService.addGameToCollection(user_id, game_id);

        res.status(201).json({ data: game });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const createExpansion = async (req, res) => {
    try {
        const { base_game_id } = req.params;

        const { title, description, bgg_id, year_published, min_players, max_players, min_play_time, max_play_time, min_age } =
            req.body;

        const submitted_by = req.user.id;

        const expansion = await gamesService.createExpansion({
            base_game_id,
            title,
            description,
            bgg_id,
            year_published,
            min_players,
            max_players,
            min_play_time,
            max_play_time,
            min_age,
            submitted_by,
        });

        res.status(201).json({
            data: expansion,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

import { XMLParser } from "fast-xml-parser";
import he from "he";
import sanitizeHtml from "sanitize-html";

const { decode } = he;

const parser = new XMLParser({
    ignoreAttributes: false,
});

export const parseSearchResults = async (data) => {
    const parsedData = parser.parse(data);

    const items = parsedData.items?.item ?? [];

    return items.map((game) => ({
        bgg_id: game["@_id"],
        title: game.name?.["@_value"],
        year_published: game.yearpublished?.["@_value"] ?? null,
    }));
};

export const parseSearchByIdResults = async (data) => {
    const parsedData = parser.parse(data);

    const items = parsedData.items?.item ?? [];

    const expansions =
        items.link
            ?.filter((link) => link["@_type"] === "boardgameexpansion")
            .map((link) => ({
                id: link["@_id"],
                name: link["@_value"],
            })) ?? [];

    const description = await cleanDescriptionData(items.description);

    return {
        bgg_id: items["@_id"],
        boardgameType: items["@_type"],
        thumbnail: items.thumbnail,
        image: items.image,
        title: items.name[0]["@_value"],
        description: description,
        year_published: items.yearpublished["@_value"],
        min_players: items.minplayers["@_value"],
        max_players: items.maxplayers["@_value"],
        expansions,
        min_play_time: items.minplaytime["@_value"],
        max_play_time: items.maxplaytime["@_value"],
        min_age: items.minage["@_value"],
    };
};

export const cleanDescriptionData = async (description) => {
    if (!description) return "";

    const decoded = decode(description);

    return sanitizeHtml(decoded, {
        allowedTags: [],
        allowedAttributes: {},
    });
};

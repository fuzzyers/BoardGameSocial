import { XMLParser } from "fast-xml-parser";
import he from "he";
import sanitizeHtml from "sanitize-html";

const { decode } = he;

const parser = new XMLParser({
    ignoreAttributes: false,
});

export const parseSearchResults = (data) => {
    const parsedData = parser.parse(data);

    const items = parsedData.items?.item ?? [];

    return items.map((game) => ({
        bgg_id: game["@_id"],
        title: cleanDescriptionData(game.name?.["@_value"]),
        year_published: game.yearpublished?.["@_value"] ?? null,
    }));
};

export const parseSearchByIdResults = async (data) => {
    const parsedData = parser.parse(data);

    const items = parsedData.items?.item;

    if (!items) {
        return null;
    }

    const expansions =
        items.link
            ?.filter((link) => link["@_type"] === "boardgameexpansion")
            .map((link) => ({
                id: link["@_id"],
                name: link["@_value"],
            })) ?? [];

    let title;
    if (Array.isArray(items.name)) {
        title = await cleanDescriptionData(items.name[0]?.["@_value"]);
    } else {
        title = await cleanDescriptionData(items.name?.["@_value"]);
    }

    return {
        bgg_id: items["@_id"],
        boardgameType: items["@_type"],

        thumbnail: items.thumbnail ?? null,
        image: items.image ?? null,

        title: title,

        description: cleanDescriptionData(items.description),

        year_published: items.yearpublished?.["@_value"] ?? null,

        min_players: items.minplayers?.["@_value"] ?? null,

        max_players: items.maxplayers?.["@_value"] ?? null,

        expansions,

        min_play_time: items.minplaytime?.["@_value"] ?? null,

        max_play_time: items.maxplaytime?.["@_value"] ?? null,

        min_age: items.minage?.["@_value"] ?? null,

        avg_rating: items.statistics?.ratings?.bayesaverage?.["@_value"] ?? null,

        avg_weight: items.statistics?.ratings?.averageweight?.["@_value"] ?? null,
    };
};

export const cleanDescriptionData = (description) => {
    if (!description) {
        return "";
    }

    const decoded = decode(description);

    return sanitizeHtml(decoded, {
        allowedTags: [],
        allowedAttributes: {},
    });
};

import { addGameToEvent, addGameToEventPoll } from "@/services/event";
import { addExpansionToGame, addToCollection, removeFromCollection } from "@/services/games";
import { updateTop3 } from "@/services/profile";
import { EventWithGames, Game } from "@/types/apiDataTypes";
import { useState } from "react";

type GameActionProps = {
    game: Game;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls" | "expansion" | "top3" | "wishlist";
    eventId?: number;
    group_id?: number;
    expansion?: Game;
    setEvent?: React.Dispatch<React.SetStateAction<EventWithGames | undefined>>;
    position?: number;
};

type ActionStatus = "success" | "error" | null;

const useGameAction = ({ game, selectedTab, eventId, group_id, expansion, setEvent, position }: GameActionProps) => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<ActionStatus>(null);

    const runAction = async (action: () => Promise<void>) => {
        try {
            setLoading(true);
            setStatus(null);

            await action();

            setStatus("success");
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    const action = async () => {
        switch (selectedTab) {
            case "database":
                return runAction(async () => {
                    await addToCollection(game.id);
                });

            case "collection":
                return runAction(async () => {
                    await removeFromCollection(game.id);
                });

            case "addtoevent":
                if (eventId === undefined || group_id === undefined) {
                    return;
                }

                return runAction(async () => {
                    await addGameToEvent(game.id, eventId, group_id);

                    setEvent?.((currentEvent) => {
                        if (!currentEvent) {
                            return currentEvent;
                        }

                        const alreadyExists = currentEvent.games.some((existingGame) => existingGame.id === game.id);

                        if (alreadyExists) {
                            return currentEvent;
                        }

                        return {
                            ...currentEvent,
                            games: [
                                ...currentEvent.games,
                                {
                                    ...game,
                                    results: [],
                                },
                            ],
                        };
                    });
                });

            case "polls":
                if (eventId === undefined) {
                    return;
                }

                return runAction(async () => {
                    const response = await addGameToEventPoll(game.id, eventId);

                    setEvent?.((currentEvent) => {
                        if (!currentEvent) {
                            return currentEvent;
                        }

                        return {
                            ...currentEvent,
                            polls: currentEvent.polls.map((poll) => {
                                if (poll.id !== eventId) {
                                    return poll;
                                }

                                if (poll.options.some((option) => option.game_id === game.id)) {
                                    return poll;
                                }

                                return {
                                    ...poll,
                                    options: [...poll.options, response.data],
                                };
                            }),
                        };
                    });
                });
            case "expansion":
                if (!expansion) {
                    return;
                }

                return runAction(async () => {
                    await addExpansionToGame(game.id, expansion);
                });

            case "top3":
                if (!position){
                    return
                }

                return runAction(async () => {
                    const response = await updateTop3(game.id, position)

                    console.log(response)
                })
            default:
                return;
        }
    };

    const getButtonConfig = () => {
        switch (selectedTab) {
            case "database":
                return {
                    title: "+",
                    loadingTitle: "...",
                    successTitle: "✓",
                    errorTitle: "✕",
                    variant: "default" as const,
                };

            case "collection":
                return {
                    title: "−",
                    loadingTitle: "...",
                    successTitle: "✓",
                    errorTitle: "✕",
                    variant: "danger" as const,
                };

            case "addtoevent":
                return {
                    title: "+",
                    loadingTitle: "...",
                    successTitle: "✓",
                    errorTitle: "✕",
                    variant: "default" as const,
                };

            case "polls":
                return {
                    title: "+",
                    loadingTitle: "...",
                    successTitle: "✓",
                    errorTitle: "✕",
                    variant: "default" as const,
                };

            case "expansion":
                return {
                    title: "+",
                    loadingTitle: "...",
                    successTitle: "✓",
                    errorTitle: "✕",
                    variant: "default" as const,
                };

            case "top3":
                return {
                    title: "+",
                    loadingTitle: "...",
                    successTitle: "✓",
                    errorTitle: "✕",
                    variant: "default" as const,
                }

            default:
                return null;
        }
    };

    return {
        action,
        loading,
        status,
        button: getButtonConfig(),
    };
};

export default useGameAction;

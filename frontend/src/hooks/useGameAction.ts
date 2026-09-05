import { addGameToEvent, addGameToEventPoll } from "@/services/event";
import { addExpansionToGame, addToCollection, removeFromCollection } from "@/services/games";
import { Game } from "@/types/apiDataTypes";
import { useState } from "react";

type GameActionProps = {
    game: Game;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls" | "expansion";
    eventId?: number;
    group_id?: number;
    expansion?: Game;
};

type ActionStatus = "success" | "error" | null;

const useGameAction = ({ game, selectedTab, eventId, group_id, expansion }: GameActionProps) => {
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
                });

            case "polls":
                console.log(eventId);
                if (eventId === undefined) {
                    return;
                }

                return runAction(async () => {
                    await addGameToEventPoll(game.id, eventId);
                });

            case "expansion":
                if (!expansion) {
                    return;
                }

                return runAction(async () => {
                    await addExpansionToGame(game.id, expansion);
                });

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

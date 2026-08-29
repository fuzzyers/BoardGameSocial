import { Game, PollType } from "@/types/apiDataTypes";
import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import GamesListModal from "../gamesList/gamesListModal";
import { getAllGames } from "@/services/games";
import { voteForGame } from "@/services/event";

type PollProps = {
    poll: PollType;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls";
};

const Poll = ({ poll, selectedTab }: PollProps) => {
    const [localPoll, setLocalPoll] = useState<PollType>(poll);

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [games, setGames] = useState<Game[]>();

    const [voting, setVoting] = useState<boolean>(false);
    const [loadingGames, setLoadingGames] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);

    const getGames = async () => {
        try {
            setLoadingGames(true);

            const response = await getAllGames();

            setGames(response);
            setVisible(true);
        } catch (error) {
            console.error("Failed to get games:", error);
            setMessage("Failed to load games.");
        } finally {
            setLoadingGames(false);
        }
    };

    const handleVote = async () => {
        if (selectedOption === null) return;

        try {
            setVoting(true);
            setMessage(null);

            await voteForGame(localPoll.id, selectedOption);

            setLocalPoll((currentPoll) => ({
                ...currentPoll,
                total_votes: currentPoll.total_votes + 1,
                options: currentPoll.options.map((option) =>
                    option.id === selectedOption
                        ? {
                              ...option,
                              votes: option.votes + 1,
                          }
                        : option
                ),
            }));

            setMessage("Vote added!");
            setSelectedOption(null);
        } catch (error) {
            console.error("Failed to vote:", error);
            setMessage("Failed to submit vote. Please try again.");
        } finally {
            setVoting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>
                {localPoll.question}
            </Text>

            {message && (
                <Text style={styles.message}>
                    {message}
                </Text>
            )}

            {localPoll.options.map((option) => {
                const percentage =
                    localPoll.total_votes > 0
                        ? (option.votes / localPoll.total_votes) * 100
                        : 0;

                const selected = selectedOption === option.id;

                return (
                    <Pressable
                        key={option.id}
                        style={[
                            styles.option,
                            selected && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedOption(option.id)}
                        disabled={voting}
                    >
                        <View style={styles.optionHeader}>
                            <Text style={styles.optionTitle}>
                                {option.title}
                            </Text>

                            <Text style={styles.voteCount}>
                                {option.votes} votes
                            </Text>
                        </View>

                        <View style={styles.progressBackground}>
                            <View
                                style={[
                                    styles.progress,
                                    { width: `${percentage}%` },
                                ]}
                            />
                        </View>

                        <Text style={styles.percentage}>
                            {Math.round(percentage)}%
                        </Text>
                    </Pressable>
                );
            })}

            <Pressable
                style={[
                    styles.voteButton,
                    (selectedOption === null || voting) &&
                        styles.buttonDisabled,
                ]}
                onPress={handleVote}
                disabled={selectedOption === null || voting}
            >
                {voting ? (
                    <View style={styles.loadingContent}>
                        <ActivityIndicator color="#fff" size="small" />

                        <Text style={styles.voteButtonText}>
                            Voting...
                        </Text>
                    </View>
                ) : (
                    <Text style={styles.voteButtonText}>
                        Vote
                    </Text>
                )}
            </Pressable>

            <Pressable
                style={[
                    styles.voteButton,
                    loadingGames && styles.buttonDisabled,
                ]}
                onPress={getGames}
                disabled={loadingGames}
            >
                {loadingGames ? (
                    <View style={styles.loadingContent}>
                        <ActivityIndicator color="#fff" size="small" />

                        <Text style={styles.voteButtonText}>
                            Loading Games...
                        </Text>
                    </View>
                ) : (
                    <Text style={styles.voteButtonText}>
                        Add Games To Poll
                    </Text>
                )}
            </Pressable>

            <GamesListModal
                visible={visible}
                games={games ?? []}
                eventId={localPoll.id}
                onClose={() => setVisible(false)}
                selectedTab={selectedTab}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 2,
    },

    question: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 16,
    },

    message: {
        marginBottom: 12,
        fontSize: 14,
        fontWeight: "600",
    },

    option: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 10,
    },

    selectedOption: {
        borderColor: "#333",
    },

    optionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    optionTitle: {
        fontSize: 16,
        fontWeight: "600",
    },

    voteCount: {
        color: "#666",
    },

    progressBackground: {
        height: 8,
        backgroundColor: "#eee",
        borderRadius: 4,
        overflow: "hidden",
    },

    progress: {
        height: "100%",
        backgroundColor: "#333",
    },

    percentage: {
        marginTop: 5,
        fontSize: 12,
        color: "#666",
    },

    voteButton: {
        backgroundColor: "#333",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    loadingContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    voteButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Poll;
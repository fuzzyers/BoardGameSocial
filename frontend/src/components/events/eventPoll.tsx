import { Game, PollType } from "@/types/apiDataTypes";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import GamesListModal from "../gamesList/gamesListModal";
import { getAllGames } from "@/services/games";
import { voteForGame } from "@/services/event";

type PollProps = {
    poll: PollType;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls"
};

const Poll = ({ poll, selectedTab }: PollProps) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [visible, setVisible] = useState<boolean>(false)
    const [games, setGames] = useState<Game[]>()
    
    const getGames = async () => {
        const response = await getAllGames()

        setGames(response)
        setVisible(true)
    }

    return (
        <View style={styles.container}>
            
            <Text style={styles.question}>{poll.question}</Text>

            {poll.options.map((option) => {
                const percentage =
                    poll.total_votes > 0
                        ? (option.votes / poll.total_votes) * 100
                        : 0;

                const selected = selectedOption === option.id;
                console.log(option)
                return (
                    <Pressable
                        key={option.id}
                        style={[
                            styles.option,
                            selected && styles.selectedOption,
                        ]}
                        onPress={() => setSelectedOption(option.id)}
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
                style={styles.voteButton}
                onPress={() => {
                    voteForGame(poll.id, selectedOption)
                }}
                disabled={selectedOption === null}
            >
                <Text style={styles.voteButtonText}>Vote</Text>
            </Pressable>

            <Pressable
                style={styles.voteButton}
                onPress={() => {getGames()}}
            >
                <Text style={styles.voteButtonText}>Add Games To poll</Text>
            </Pressable>

            <GamesListModal 
                visible={visible}
                games={games ?? []}
                eventId={poll.id} 
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
        marginTop: 6,
    },

    voteButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Poll;
import { EventWithGames, Game } from "@/types/apiDataTypes";
import { StyleSheet, Text, View } from "react-native";
import GameActionButton from "./gameActionButton";
import useGameAction from "@/hooks/useGameAction";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import Button from "@/components/generalComponents/Button";
import { addToWishList } from "@/services/games";

type GamesCardHeaderProps = {
    game: Game;
    selectedTab: "collection" | "database" | "add" | "addtoevent" | "polls" | "expansion" | "top3" | "wishlist";
    eventId?: number;
    group_id?: number;
    expansion?: Game;
    setEvent?: React.Dispatch<React.SetStateAction<EventWithGames | undefined>>;
    wishlist?: boolean;
};

const GamesCardHeader = ({ game, selectedTab, eventId, group_id, expansion, setEvent, wishlist }: GamesCardHeaderProps) => {
    const [position, setPosition] = useState<number>(1);
    const [wishlistAdd, setWishlistAdd] = useState<boolean>(false)
    const [wishlistText, setWishlistText] = useState<string>("wishlist")
    const { action, loading, status, button } = useGameAction({
        game,
        selectedTab,
        eventId,
        group_id,
        expansion,
        setEvent,
        position
    });

    const handleAddToWishList = async () => {
        try {
            setWishlistAdd(true)

            const response = await addToWishList(game.id)

            setWishlistText("Added")
        } catch (error) {
            setWishlistAdd(false)
        }
    }

    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <View style={styles.titleRow}>
                    <Text style={styles.title} numberOfLines={1}>
                        {game.title}
                    </Text>

                    {game.review_status === "approved" && (
                        <View style={[styles.reviewTag, styles.verifiedTag]}>
                            <Text style={[styles.reviewText, styles.verifiedText]}>✓ Verified</Text>
                        </View>
                    )}

                    {game.review_status === "pending" && (
                        <View style={[styles.reviewTag, styles.pendingTag]}>
                            <Text style={[styles.reviewText, styles.pendingText]}>⚠ Not Verified</Text>
                        </View>
                    )}

                    {game.review_status === "rejected" && (
                        <View style={[styles.reviewTag, styles.rejectedTag]}>
                            <Text style={[styles.reviewText, styles.rejectedText]}>✕ Rejected</Text>
                        </View>
                    )}
                </View>

                {game.year_published && <Text style={styles.year}>{game.year_published}</Text>}
            </View>

            <View style={styles.actionContainer}>
                {selectedTab === "top3" && (
                    <View style={styles.positionPickerContainer}>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={position}
                                onValueChange={(value) => setPosition(value)}
                                style={styles.picker}
                            >
                                <Picker.Item label="1st" value={1} />
                                <Picker.Item label="2nd" value={2} />
                                <Picker.Item label="3rd" value={3} />
                            </Picker>
                        </View>
                    </View>
                )}

                {button && (
                    <GameActionButton
                        title={button.title}
                        loadingTitle={button.loadingTitle}
                        successTitle={button.successTitle}
                        errorTitle={button.errorTitle}
                        adding={loading}
                        status={status}
                        onPress={action}
                        variant={button.variant}
                    />
                )}

                {wishlist && (
                    <Button
                        title={wishlistText}
                        onPress={() => handleAddToWishList()}
                        variant={"secondary"}
                        disabled={wishlistAdd}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
    },

    titleContainer: {
        flex: 1,
        minWidth: 0,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
    },

    title: {
        flexShrink: 1,
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },

    reviewTag: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 6,
    },

    reviewText: {
        fontSize: 11,
        fontWeight: "700",
    },

    verifiedTag: {
        backgroundColor: "#e8f5e9",
    },

    verifiedText: {
        color: "#2e7d32",
    },

    pendingTag: {
        backgroundColor: "#fff8e1",
    },

    pendingText: {
        color: "#f57c00",
    },

    rejectedTag: {
        backgroundColor: "#ffebee",
    },

    rejectedText: {
        color: "#c62828",
    },

    year: {
        marginTop: 3,
        fontSize: 12,
        color: "#777",
    },

    actionContainer: {
        marginLeft: 10,
        flexShrink: 0,
    },

    positionPickerContainer: {
        marginBottom: 16,
    },

    positionLabel: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },

    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        overflow: "hidden",
    },
    picker: {
        height: 40,
        width: 85,
    },
});

export default GamesCardHeader;

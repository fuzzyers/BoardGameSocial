import { AddPlayersScore } from "@/services/eventScoring";
import { Game } from "@/types/apiDataTypes";
import { useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type Member = {
    id: number;
    name: string;
    username: string;
};

type GameResult = {
    user_id: number;
    name: string;
    username: string;
    placement: number;
    score: number;
    leaderboard_points: number;
};

type ResultTableProps = {
    game: {
        id: number;
        title: string;
        results: GameResult[];
        avg_weight: number;
    };
    members: Member[];
    event_id: number;
};

const ResultTable = ({
    game,
    members,
    event_id,
}: ResultTableProps) => {
    const [selectedMember, setSelectedMember] =
        useState<Member | null>(null);

    const [placement, setPlacement] = useState("");
    const [score, setScore] = useState("");

    const [saving, setSaving] = useState(false);

    const availableMembers = members.filter(
        (member) =>
            !game.results.some(
                (result) => result.user_id === member.id
            )
    );

    const openAddPlayer = (member: Member) => {
        setSelectedMember(member);
        setPlacement("");
        setScore("");
    };

    const closeModal = () => {
        if (saving) {
            return;
        }

        setSelectedMember(null);
        setPlacement("");
        setScore("");
    };

    const handleAddPlayer = async () => {
        if (!selectedMember) {
            return;
        }

        const placementNumber = Number(placement);
        const scoreNumber = Number(score);

        if (
            !Number.isInteger(placementNumber) ||
            placementNumber < 0
        ) {
            return;
        }

        if (!Number.isFinite(scoreNumber)) {
            return;
        }

        try {
            setSaving(true);

            await AddPlayersScore(
                event_id,
                selectedMember.id,
                game.id,
                scoreNumber,
                placementNumber,
                game.avg_weight
            );

            closeModal();
        } catch (error) {
            console.error(
                "Failed to add player result:",
                error
            );
        } finally {
            setSaving(false);
        }
    };

    const handleRemovePlayer = (userId: number) => {
        console.log("Remove player:", userId);
    };

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {game.title}
                </Text>

                {game.results.length > 0 && (
                    <View style={styles.table}>
                        <View
                            style={[
                                styles.row,
                                styles.headerRow,
                            ]}
                        >
                            <View style={styles.playerColumn}>
                                <Text style={styles.headerText}>
                                    Player
                                </Text>
                            </View>

                            <View style={styles.placeColumn}>
                                <Text style={styles.headerText}>
                                    Place
                                </Text>
                            </View>

                            <View style={styles.scoreColumn}>
                                <Text style={styles.headerText}>
                                    Score
                                </Text>
                            </View>

                            <View style={styles.pointsColumn}>
                                <Text style={styles.headerText}>
                                    Points
                                </Text>
                            </View>

                            <View style={styles.actionColumn} />
                        </View>

                        {game.results.map(
                            (result, index) => (
                                <View
                                    key={result.user_id}
                                    style={[
                                        styles.row,
                                        index ===
                                            game.results.length -
                                                1 &&
                                            styles.lastRow,
                                    ]}
                                >
                                    <View
                                        style={
                                            styles.playerColumn
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.cellText
                                            }
                                        >
                                            {result.name}
                                        </Text>

                                        <Text
                                            style={
                                                styles.username
                                            }
                                        >
                                            @{result.username}
                                        </Text>
                                    </View>

                                    <View
                                        style={
                                            styles.placeColumn
                                        }
                                    >
                                        <Text
                                            style={[
                                                styles.cellText,
                                                result.placement ===
                                                    0 &&
                                                    styles.dnfText,
                                            ]}
                                        >
                                            {result.placement ===
                                            0
                                                ? "DNF"
                                                : result.placement}
                                        </Text>
                                    </View>

                                    <View
                                        style={
                                            styles.scoreColumn
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.cellText
                                            }
                                        >
                                            {result.score}
                                        </Text>
                                    </View>

                                    <View
                                        style={
                                            styles.pointsColumn
                                        }
                                    >
                                        <Text
                                            style={
                                                styles.cellText
                                            }
                                        >
                                            {
                                                result.leaderboard_points
                                            }
                                        </Text>
                                    </View>

                                    <View
                                        style={
                                            styles.actionColumn
                                        }
                                    >
                                        <Pressable
                                            onPress={() =>
                                                handleRemovePlayer(
                                                    result.user_id
                                                )
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.remove
                                                }
                                            >
                                                ×
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            )
                        )}
                    </View>
                )}

                <View style={styles.addSection}>
                    <Text style={styles.addTitle}>
                        Add Players
                    </Text>

                    {availableMembers.length === 0 ? (
                        <Text style={styles.noPlayers}>
                            All event members have been added.
                        </Text>
                    ) : (
                        availableMembers.map(
                            (member) => (
                                <Pressable
                                    key={member.id}
                                    style={styles.memberButton}
                                    onPress={() =>
                                        openAddPlayer(
                                            member
                                        )
                                    }
                                >
                                    <View>
                                        <Text
                                            style={
                                                styles.memberName
                                            }
                                        >
                                            {member.name}
                                        </Text>

                                        <Text
                                            style={
                                                styles.memberUsername
                                            }
                                        >
                                            @{member.username}
                                        </Text>
                                    </View>

                                    <Text
                                        style={
                                            styles.addIcon
                                        }
                                    >
                                        +
                                    </Text>
                                </Pressable>
                            )
                        )
                    )}
                </View>
            </View>

            <Modal
                visible={selectedMember !== null}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <View>
                                <Text
                                    style={
                                        styles.modalTitle
                                    }
                                >
                                    Add Result
                                </Text>

                                <Text
                                    style={
                                        styles.modalPlayer
                                    }
                                >
                                    {selectedMember?.name}
                                </Text>
                            </View>

                            <Pressable
                                onPress={closeModal}
                                disabled={saving}
                            >
                                <Text
                                    style={
                                        styles.closeButton
                                    }
                                >
                                    ×
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>
                                Placement
                            </Text>

                            <TextInput
                                value={placement}
                                onChangeText={setPlacement}
                                placeholder="Enter placement (0 = DNF)"
                                keyboardType="numeric"
                                style={styles.input}
                                editable={!saving}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>
                                Score
                            </Text>

                            <TextInput
                                value={score}
                                onChangeText={setScore}
                                placeholder="Enter score"
                                keyboardType="numeric"
                                style={styles.input}
                                editable={!saving}
                            />
                        </View>

                        <View style={styles.modalActions}>
                            <Pressable
                                style={styles.cancelButton}
                                onPress={closeModal}
                                disabled={saving}
                            >
                                <Text
                                    style={
                                        styles.cancelButtonText
                                    }
                                >
                                    Cancel
                                </Text>
                            </Pressable>

                            <Pressable
                                style={[
                                    styles.saveButton,
                                    saving &&
                                        styles.disabledButton,
                                ]}
                                onPress={
                                    handleAddPlayer
                                }
                                disabled={saving}
                            >
                                <Text
                                    style={
                                        styles.saveButtonText
                                    }
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Save Result"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginBottom: 20,
        elevation: 2,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 14,
    },

    table: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        overflow: "hidden",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 52,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },

    lastRow: {
        borderBottomWidth: 0,
    },

    headerRow: {
        backgroundColor: "#f5f5f5",
    },

    playerColumn: {
        flex: 1,
        paddingHorizontal: 10,
    },

    placeColumn: {
        width: 65,
        alignItems: "center",
        justifyContent: "center",
    },

    scoreColumn: {
        width: 65,
        alignItems: "center",
        justifyContent: "center",
    },

    pointsColumn: {
        width: 65,
        alignItems: "center",
        justifyContent: "center",
    },

    actionColumn: {
        width: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    headerText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#666",
    },

    cellText: {
        fontSize: 14,
        color: "#222",
    },

    username: {
        marginTop: 2,
        fontSize: 11,
        color: "#888",
    },

    dnfText: {
        fontWeight: "700",
        color: "#c62828",
    },

    remove: {
        fontSize: 24,
        color: "#c62828",
        fontWeight: "600",
    },

    addSection: {
        marginTop: 16,
    },

    addTitle: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 8,
    },

    memberButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 6,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
    },

    memberName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#222",
    },

    memberUsername: {
        marginTop: 2,
        fontSize: 11,
        color: "#888",
    },

    addIcon: {
        fontSize: 22,
        fontWeight: "600",
    },

    noPlayers: {
        fontSize: 13,
        color: "#777",
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    modalContent: {
        width: "100%",
        maxWidth: 450,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#222",
    },

    modalPlayer: {
        marginTop: 3,
        fontSize: 14,
        color: "#777",
    },

    closeButton: {
        fontSize: 28,
        color: "#777",
        lineHeight: 28,
    },

    formGroup: {
        marginBottom: 16,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
        color: "#333",
    },

    input: {
        height: 46,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 15,
    },

    modalActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 8,
        marginTop: 4,
    },

    cancelButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },

    cancelButtonText: {
        fontWeight: "600",
        color: "#555",
    },

    saveButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: "#4A90E2",
    },

    saveButtonText: {
        color: "#fff",
        fontWeight: "700",
    },

    disabledButton: {
        opacity: 0.6,
    },
});

export default ResultTable;
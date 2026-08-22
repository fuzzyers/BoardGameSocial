import { Pressable, StyleSheet, Text, View } from "react-native";

export type EventTimeFilter = "all" | "upcoming" | "past";

type Group = {
    id: number;
    name: string;
};

type EventFiltersProps = {
    timeFilter: EventTimeFilter;
    groupFilter: number | null;
    groups: Group[];
    onTimeFilterChange: (filter: EventTimeFilter) => void;
    onGroupFilterChange: (groupId: number | null) => void;
};

const EventFilters = ({ timeFilter, groupFilter, groups, onTimeFilterChange, onGroupFilterChange }: EventFiltersProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Events</Text>

            {/* Time filter */}
            <View style={styles.filterRow}>
                <FilterButton label="All" active={timeFilter === "all"} onPress={() => onTimeFilterChange("all")} />

                <FilterButton
                    label="Upcoming"
                    active={timeFilter === "upcoming"}
                    onPress={() => onTimeFilterChange("upcoming")}
                />

                <FilterButton label="Past" active={timeFilter === "past"} onPress={() => onTimeFilterChange("past")} />
            </View>

            {/* Group filter */}
            <Text style={styles.label}>Group</Text>

            <View style={styles.filterRow}>
                <FilterButton label="All Groups" active={groupFilter === null} onPress={() => onGroupFilterChange(null)} />

                {groups.map((group) => (
                    <FilterButton
                        key={group.id}
                        label={group.name}
                        active={groupFilter === group.id}
                        onPress={() => onGroupFilterChange(group.id)}
                    />
                ))}
            </View>
        </View>
    );
};

type FilterButtonProps = {
    label: string;
    active: boolean;
    onPress: () => void;
};

const FilterButton = ({ label, active, onPress }: FilterButtonProps) => {
    return (
        <Pressable style={[styles.button, active && styles.activeButton]} onPress={onPress}>
            <Text style={[styles.buttonText, active && styles.activeButtonText]}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },

    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 16,
        marginBottom: 8,
    },

    filterRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },

    button: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#e5e5e5",
    },

    activeButton: {
        backgroundColor: "#333",
    },

    buttonText: {
        fontSize: 14,
        color: "#333",
    },

    activeButtonText: {
        color: "#fff",
    },
});

export default EventFilters;

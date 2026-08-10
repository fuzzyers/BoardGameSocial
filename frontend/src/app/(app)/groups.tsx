import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Group } from "@/types/apiDataTypes";
import NavGroups from "@/components/groupManagment/navGroups";
import ChatBox from "@/components/groupManagment/chatbox";
import { getGroups } from "@/services/groups";
import { getSocket } from "@/services/socket";

const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

    const loadGroups = async () => {
        try {
            const data = await getGroups();

            if (Array.isArray(data)) {
                setGroups(data);
            }
        } catch (error) {
            console.error("Failed to load groups:", error);
        }
    };

    useEffect(() => {
        loadGroups();
    }, []);

    useEffect(() => {
        const socket = getSocket();

        if (!socket) {
            return;
        }

        const handleGroupCreated = () => {
            loadGroups();
        };

        socket.on("group_created", handleGroupCreated);

        return () => {
            socket.off("group_created", handleGroupCreated);
        };
    }, []);

    return (
        <View style={styles.container}>
            {selectedGroup === null ? (
                <NavGroups groups={groups} onSelectGroup={setSelectedGroup} />
            ) : (
                <ChatBox group={selectedGroup} onBack={() => setSelectedGroup(null)} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Groups;

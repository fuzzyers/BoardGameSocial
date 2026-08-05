import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native"
import CreateGroupModal from "./createGroupModal";
import { Group } from "@/types/apiDataTypes";
import { NavigationOption } from "@/types/navigationProps";
import { useState } from "react";
import { getSocket } from "@/services/socket";

type NavGroupProps = {
    groups: Group[];
    onSelectGroup: (group: Group) => void;
};

const NavGroups = ({groups, onSelectGroup}: NavGroupProps) => {
    const [showModal, setShowModal] = useState(false)
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const { width, height } = useWindowDimensions();
    const styles = createStyles(width, height)
    
    const setModal = () => {
        setShowModal(!showModal)
    }

    const handleGroupSelect = (group: Group) => {
        onSelectGroup(group);
        setSelectedGroupId(group.id);
        const socket = getSocket();
        if (!socket) return;
        socket.emit("joinRoom", group.chat_id); 
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.navbarContent}
        >
            <Pressable style={styles.navbarButton} onPress={() => setModal()}>
                <Text style={styles.navbarButtonText}>Create a Group</Text>
            </Pressable>
            <CreateGroupModal visible={showModal} onClose={() => setShowModal(false)}/>
                {groups?.map((group) => (
                <Pressable 
                    key={group.id}
                    style={[
                        styles.navbarButton,
                        selectedGroupId === group.id && styles.selectedNavbarButton,
                    ]}
                    onPress={() => handleGroupSelect(group)}
                >
                    <Text style={[
                        styles.navbarButtonText,
                        selectedGroupId === group.id && styles.selectedNavbarButtonText,
                        ]}>
                        {group.name}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    )
}

const createStyles = (width: number, height: number) => {
    return StyleSheet.create({
        navbarButton: {
            alignItems: 'center',
            justifyContent: "center",
            width:"100%",
            marginVertical: 8,
            paddingVertical: 12,
            paddingHorizontal: 24,
            backgroundColor: '#ffffff',
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            height: 100
        },
        navbarButtonText: {
            color: '#007AFF',
            fontSize: Math.min(width, height) * 0.04,
            fontWeight: '600',
        },
        navbarContent: {
            alignItems: 'center',
            width: '100%',
        },
        selectedNavbarButton: {
            backgroundColor: "#F3F9FF",
            borderLeftWidth: 6,
            borderLeftColor: "#007AFF",
        },

        selectedNavbarButtonText: {
            color: "#005FCC",
            fontWeight: "700",
        },
})}

export default NavGroups
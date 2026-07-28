import { createGroup } from "@/services/groups";
import { View, Text, StyleSheet, useWindowDimensions, Pressable, ScrollView } from "react-native";

type Group = {
    id:number;
    name: string;
}

type NavChatProps = {
    groups: Group[];
};

export default function NavChat({groups}: NavChatProps) {
    const { width, height } = useWindowDimensions();
    const styles = createStyles(width, height)

    return (
        <View style={styles.navbar}>
            <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={styles.navbarContent}
            >
                <Pressable style={styles.navbarButton} onPress={() => createGroup("test", "test")}>
                    <Text style={styles.navbarButtonText}>Create a Group</Text>
                </Pressable>
                 {groups.map((group) => (
                    <Pressable 
                        key={group.id}
                        style={styles.navbarButton}
                    >
                        <Text style={styles.navbarButtonText}>
                            {group.name}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}

const createStyles = (width: number, height: number) => {
    return StyleSheet.create({
        navbar: {
            flexDirection: 'column',
            alignItems: 'center',
            padding: 16,
            backgroundColor: '#f0f0f0',
            width:"50%",
            height: "100%"
        },
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
})}
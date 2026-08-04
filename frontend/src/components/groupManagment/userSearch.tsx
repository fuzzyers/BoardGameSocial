import { GroupDetails, User } from '@/types/apiDataTypes';
import { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import searchUsers from '@/services/users';
import AddUserButton from './addUserButton';

type UserSearchProps = {
    groupData: GroupDetails | null;
};

const UserSearch = ({ groupData }: UserSearchProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchQuery.length < 2) {
            setSearchResults([]);
            return;
        }
        if (!groupData) {
            console.error('Group data is null');
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);

            const users = await searchUsers(searchQuery, groupData?.id);
            console.log('Fetched users:', users);
            setSearchResults(users);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search users..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userRow}>
                        <Text style={styles.userName}>{item.username}</Text>
                        <Text style={styles.userName}>{item.name}</Text>
                        <AddUserButton userId={item.id} groupId={groupData?.id} />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    userRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    userName: {
        fontSize: 16,
    },
});

export default UserSearch;
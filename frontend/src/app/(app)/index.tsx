import { StyleSheet, Text, View } from 'react-native';
import Navbar from "@/components/navbar";
import ChatBox from '@/components/chatbox';
import NavGroup from '@/components/navGroup';
import { useEffect, useState } from 'react';
import { getGroups } from '@/services/groups';

type Group = {
    id: number;
    name: string;
    description: string;
    created_at: string;
    chat_id: number;
};

export default function HomeScreen() {
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)

  useEffect(() => {
    const getData = async () => {
      const groupsData = await getGroups()

      setGroups(groupsData?.data.data)
    }

    getData()
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <Navbar />
        <NavGroup groups={groups} onSelectGroup={setSelectedGroup}/>
      </View>
      <View style={styles.containerRight}>
        <ChatBox group={selectedGroup}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 24,
  },
  containerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:"center",
    alignItems: "center"
  },
  containerRight: {
    flex: 1,
    justifyContent:"center",
    alignItems: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

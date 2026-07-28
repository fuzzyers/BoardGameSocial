import { StyleSheet, Text, View } from 'react-native';
import Navbar from "@/components/navbar";
import ChatBox from '@/components/chatbox';
import NavChat from '@/components/navChat';
import { useEffect, useState } from 'react';
import { getGroups } from '@/services/groups';

export default function HomeScreen() {
  const [groups, setGroups] = useState([])
  useEffect(() => {
    const getData = async () => {
      const groupsData = await getGroups()
      console.log(groupsData?.data.data)
      setGroups(groupsData?.data.data)
  
    }

    getData()
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <Navbar />
        <NavChat groups={groups}/>
      </View>
      <View style={styles.containerRight}>
        <ChatBox />
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

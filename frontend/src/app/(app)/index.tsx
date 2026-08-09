import { StyleSheet, Text, View } from 'react-native';
import Navbar from "@/components/navbar";
import ChatBox from '@/components/groupManagment/chatbox';
import NavSideBar from '@/components/navSideBar';
import { useEffect, useState } from 'react';
import { getGroups } from '@/services/groups';
import { Group } from '@/types/apiDataTypes';
import FriendsListContainer from '@/components/friendsList/friendsListContainer';
import { NavigationOption } from '@/types/navigationProps';
import GamesContainer from '@/components/gamesList/gamesContainer';

export default function HomeScreen() {
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [selectedButton, setSelectedButton] = useState<NavigationOption>("Group")

  useEffect(() => {
    const getData = async () => {
      const groupsData = await getGroups()

      setGroups(groupsData?.data.data)
    }

    getData()
  },[])

  return (
    <View style={styles.container}>
        <Navbar onSetSelected={setSelectedButton}/>

        {selectedButton === "Group" && (
            <NavSideBar 
                groups={groups}
                onSelectGroup={setSelectedGroup}
                selectedButton={selectedButton}
            />
        )}

        <View style={styles.containerRight}>
            {selectedButton === "Group" && (
                <ChatBox group={selectedGroup}/>
            )}

            {selectedButton === "Friend" && (
                <FriendsListContainer />
            )}
            {selectedButton === "Games" && (
                <GamesContainer />
            )}
        </View>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "row",
      padding: 24,
  },

  containerRight: {
      flex: 1,
  }
});

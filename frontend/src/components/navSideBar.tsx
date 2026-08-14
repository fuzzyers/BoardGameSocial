import { Group } from "@/types/apiDataTypes";
import { NavigationOption } from "@/types/navigationProps";
import { StyleSheet, View } from "react-native";
import NavGroups from "./groupManagment/navGroups";

type NavGroupProps = {
    groups: Group[];
    onSelectGroup: (group: Group) => void;
    selectedButton: NavigationOption;
};

const NavSideBar = ({ groups, onSelectGroup, selectedButton }: NavGroupProps) => {
    return (
        <View style={styles.navbar}>
            {selectedButton === "Group" && <NavGroups groups={groups} onSelectGroup={onSelectGroup} />}
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "column",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#f0f0f0",
        width: 400,
        height: "100%",
    },
});

export default NavSideBar;

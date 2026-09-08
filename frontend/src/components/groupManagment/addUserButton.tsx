import { addUserToGroup } from "@/services/groups";
import Button from "../generalComponents/Button";
import { useState } from "react";

const AddUserButton = ({ userId, groupId }: { userId: number; groupId: number | undefined }) => {
    const [title, setTitle] = useState("Add User")
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleAddUser = async () => {
        try {
            if (!groupId) {
                return;
            }
            setButtonDisabled(true)

            await addUserToGroup(groupId, userId);

            setTitle("User Added")
        } catch (error) {
            setButtonDisabled(false)
            setTitle("Try Again")
        }

    };

    return (
        <Button
            title={title}
            onPress={() => handleAddUser()}
            variant="secondary"
            disabled={buttonDisabled}
        />
    );
};

export default AddUserButton;

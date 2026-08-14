import {
    addMemberToGroup,
    create,
    deleteGroupQuery,
    getGroupById,
    getGroupsWithUser,
    getGroupWithMembers,
    removeMemberFromGroup,
} from "../services/groups.js";
import pool from "../db/db.js";
import { createMessageBoard } from "../services/messages.js";

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * @createResult.id = This will be the group Id
 */
export const createGroup = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        const createResult = await create(name, description, client);
        await addMemberToGroup(createResult.id, userId, 1, client);
        const finalResult = await getGroupWithMembers(createResult.id, client);
        const createMessageBoardData = await createMessageBoard(createResult.id, client);
        await client.query("COMMIT");

        const io = req.app.get("io");
        io.emit("group_created");

        res.status(201).json(finalResult);
    } catch (error) {
        console.error(error);

        await client.query("ROLLBACK");

        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    } finally {
        client.release();
    }
};

export const addUserToGroup = async (req, res) => {
    try {
        const { groupId, userId, roleId } = req.body;
        const ownerId = req.user.id;
        console.log("GroupId: ", groupId, "RoleId: ", roleId, "UserId: ", userId);
        if (![2, 3].includes(roleId)) {
            return res.status(401).json({ message: "Invalid Role input" });
        }

        const getGroup = await getGroupWithMembers(groupId);
        console.log(getGroup);
        // Check if the user is the owner of the group
        if (getGroup.members[0].id !== ownerId) {
            return res.status(401).json({ message: "You are not the owner of this group" });
        }

        const memberExists = getGroup.members.some((member) => member.id === userId);

        if (memberExists) {
            return res.status(401).json({ message: "This member is already in the group", data: getGroup });
        }
        const addedUser = await addMemberToGroup(groupId, userId, roleId);

        res.status(201).json({ message: "success", results: addedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    }
};

export const getAllGroups = async (req, res) => {
    try {
        const userId = req.user.id;

        const getData = await getGroupsWithUser(userId);

        res.status(200).json({ message: "success", data: getData });
    } catch (error) {
        console.log(error);
    }
};

export const getAllGroupByIdData = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getGroupById(id);

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

export const removeUserFromGroup = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const ownerId = req.user.id;

        const getGroup = await getGroupWithMembers(groupId);
        // Check if the user is the owner of the group
        if (getGroup.members[0].id !== ownerId) {
            return res.status(401).json({ message: "You are not the owner of this group" });
        }

        const memberExists = getGroup.members.some((member) => member.id === userId);

        if (!memberExists) {
            return res.status(401).json({ message: "This member is not in the group", data: getGroup });
        }

        const removedUser = await removeMemberFromGroup(groupId, userId);

        res.status(201).json({ message: "success", results: removedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    }
};

export const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteGroupQuery(id);

        res.status(201).json({ message: "success", results: response });
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
            errorDetails: error.message,
        });
    }
};

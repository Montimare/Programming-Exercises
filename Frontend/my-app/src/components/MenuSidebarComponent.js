import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"
import GroupsIcon from "@mui/icons-material/Groups"
import ListIcon from '@mui/icons-material/List';
import Divider from "@mui/material/Divider"
import { Link, useLocation } from "react-router-dom";
import { createEventLists, createGroupLists, createGroupMembers, createGroups, deleteEventLists, deleteGroups, deleteMembers, editEventLists, editGroups, fetchEventListsInGroupsByUser, fetchGroupMembers, fetchGroupsByUser, fetchOwnedEventListsByUser } from "../Services/WebService";
import GroupPopupComponent from "./GroupPopupComponent"
import GroupCreateComponent from "./GroupCreateComponent";
import ListPopupComponent from "./ListPopupComponent";
import ListCreateComponent from "./ListCreateComponent";

/*
    TODO: Create buttons for each event list + the event list creating popup
*/

const MenuSidebarComponent = ({ selectedUserID, sendUpdateListRequest, requestUpdateGroupLists, requestUpdateEvents }) => {
    // Username and email
    const location = useLocation();
    const { username, email } = location.state || "";

    // Group Management
    const [groups, setGroups] = useState([]);
    const [selectedGroupID, setSelectedGroupID] = useState();
    const [selectedGroupName, setSelectedGroupName] = useState();
    const [selectedAdmin, setSelectedAdmin] = useState();
    const [openGroup, setOpenGroup] = useState(false);
    const [openCreateGroup, setOpenCreateGroup] = useState(false);

    // Event List Management
    const [eventLists, setEventLists] = useState([]);
    const [selectedList, setSelectedList] = useState();
    const [selectedListName, setSelectedListName] = useState();
    const [openList, setOpenList] = useState(false);
    const [openCreateList, setOpenCreateList] = useState(false);

    // Rendering
    const [loadingGroups, setLoadingGroups] = useState(true);
    const [loadingLists, setLoadingLists] = useState(true);
    const [groupsChangeTracker, setGroupsChangeTracker] = useState(0);
    const [listsChangeTracker, setListsChangeTracker] = useState(0);

    useEffect(() => { }, [selectedGroupName]); // Dependency on selectedGroupName
    useEffect(() => { }, [selectedGroupID]); // Dependency on selectedGroupID

    useEffect(() => {
        const getGroups = async () => {
            try {
                const groupData = await fetchGroupsByUser(selectedUserID)
                    .then(groupData => {
                        setGroups(groupData.data);  // update state with fetched groups
                        setLoadingGroups(false);
                    });
            } catch (error) {
                console.error("Failed to fetch groups: " + error);
            }
        }

        getGroups();    // call the async function
    }, [groupsChangeTracker]); // Empty dependency array means this effect runs only once

    useEffect(() => {
        const getEventLists = async () => {
            try {
                const eventListData = await fetchOwnedEventListsByUser(selectedUserID)
                    .then(eventListData => {
                        setEventLists(eventListData.data);  // update state with fetched groups
                        setLoadingLists(false);
                    });
            } catch (error) {
                console.error("Failed to fetch event lists: " + error);
            }
        }

        getEventLists();    // call the async function
    }, [listsChangeTracker]); // Empty dependency array means this effect runs only once

    const updateGroups = () => {
        setGroupsChangeTracker(prev => prev + 1);
    }

    const updateLists = () => {
        setListsChangeTracker(prev => prev + 1);
        sendUpdateListRequest();
    }

    // Group Popup
    const handleOpenGroup = async (groupName, groupID, admin) => {
        await fetchGroupMembers(groupID);
        setSelectedGroupName(groupName);
        setSelectedGroupID(groupID);
        setSelectedAdmin(admin);
        setOpenGroup(true);
    }

    const handleCloseGroup = () => {
        setOpenGroup(false);
    }

    // Create Group Popup
    const handleOpenCreateGroup = () => {
        setOpenCreateGroup(true);
    }

    const handleCloseCreateGroup = () => {
        setOpenCreateGroup(false);
    }

    const handleCreateGroup = async (groupName) => {
        await createGroups({
            name: groupName,
            admin: selectedUserID
        });
        updateGroups();
    }

    const handleEditGroup = async (groupID, groupName, adminID) => {
        await editGroups({
            id: groupID,
            name: groupName,
            admin: adminID
        });
        setSelectedGroupName(groupName);
        updateGroups();
    }

    // Add members
    const handleAddMembers = (selectedMembers) => {
        for (const member of selectedMembers) {
            createGroupMembers(member, selectedGroupID);
            updateGroups();
        }
    }

    // Add lists
    const handleAddLists = async (selectedLists) => {
        for (const list of selectedLists) {
            await createGroupLists(selectedGroupID, list);
        }
        updateGroups();
        requestUpdateGroupLists();
    }

    // Delete Group
    const handleDeleteGroup = async () => {
        await deleteGroups(selectedGroupID);
        updateGroups();
        requestUpdateEvents();
    }

    // List Popup
    const handleOpenList = (list) => {
        setSelectedList(list);
        setSelectedListName(list.name);
        setOpenList(true);
    }

    const handleCloseList = () => {
        setOpenList(false);
    }

    // Create List Popup
    const handleOpenCreateList = () => {
        setOpenCreateList(true);
    }

    const handleCloseCreateList = () => {
        setOpenCreateList(false);
    }

    const handleCreateList = async (listName) => {
        await createEventLists({
            name: listName,
            admin: selectedUserID
        })
        updateLists();
    }

    const handleEditList = async (listName) => {
        await editEventLists({
            id: selectedList.id,
            name: listName,
            admin: selectedUserID
        });
        setSelectedListName(listName);
        updateLists();
    }

    const handleDeleteList = async () => {
        setOpenList(false);
        await deleteEventLists(selectedList.id);
        updateLists();
        requestUpdateEvents();
    }

    const handleLeaveGroup = async (memberID) => {
        setOpenGroup(false);
        await deleteMembers(memberID);
        updateGroups();
        requestUpdateEvents();
    }

    const handleKickMember = (memberID) => {
        deleteMembers(memberID);
        updateGroups();
        requestUpdateEvents();
    }


    return (
        <>
            <Box
                sx={{
                    width: 250
                }}
                role="presentation"
            >
                <List>
                    <ListItem>
                        <List>
                            <ListItem><PersonIcon />&nbsp;<b>{username}</b></ListItem>
                            <ListItem>{email}</ListItem>
                        </List>
                    </ListItem>
                    <Divider />
                    <ListItem><GroupsIcon />&nbsp;<b>Groups</b></ListItem>
                    <Divider variant="middle" />
                    <ListItem>
                        <List>
                            {loadingGroups && <CircularProgress />}
                            {groups.map(group => (
                                <ListItem key={group.id} value={group.id}>
                                    <Button onClick={async () => await handleOpenGroup(group.name, group.id, group.admin)}>{group.name}</Button>
                                </ListItem>
                            ))}
                            <ListItem>
                                <Button onClick={handleOpenCreateGroup}>Create new group...</Button>
                            </ListItem>
                        </List>
                    </ListItem>
                    <Divider />
                    <ListItem><ListIcon /><b>&nbsp;Event lists</b></ListItem>
                    <Divider variant="middle" />
                    <ListItem>
                        <List>
                            {loadingLists && <CircularProgress/>}
                            {eventLists.map(eventList => (
                                <ListItem key={eventList.id} value={eventList.id}>
                                    <Button onClick={() => handleOpenList(eventList)}>{eventList.name}</Button>
                                </ListItem>
                            ))}
                            <ListItem>
                                <Button onClick={handleOpenCreateList}>Create new list...</Button>
                            </ListItem>
                        </List>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Link to={"/"}>
                            <Button variant="text" color="error">Log out</Button>
                        </Link>
                    </ListItem>
                </List>
            </Box>
            {openGroup && (<GroupPopupComponent
                open={openGroup}
                handleClose={handleCloseGroup}
                requestAddMembers={handleAddMembers}
                requestLeave={handleLeaveGroup}
                requestAddLists={handleAddLists}
                requestEdit={handleEditGroup}
                requestDelete={handleDeleteGroup}
                requestKick={handleKickMember}
                selectedUserID={selectedUserID}
                groupName={selectedGroupName}
                groupID={selectedGroupID}
                admin={selectedAdmin}
            />)}
            {openCreateGroup && (<GroupCreateComponent
                open={openCreateGroup}
                handleClose={handleCloseCreateGroup}
                requestCreate={handleCreateGroup}
            />)}
            {openList && (<ListPopupComponent
                open={openList}
                selectedList={selectedList}
                selectedListName={selectedListName}
                handleClose={handleCloseList}
                requestEdit={handleEditList}
                requestDelete={handleDeleteList}
                username={username}
                email={email}
            />)}
            {openCreateList && (<ListCreateComponent
                open={openCreateList}
                requestCreate={handleCreateList}
                handleClose={handleCloseCreateList}
            />)}
        </>
    );
}

export default MenuSidebarComponent;
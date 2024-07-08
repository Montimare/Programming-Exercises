import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, List, ListItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"
import GroupsIcon from "@mui/icons-material/Groups"
import ListIcon from '@mui/icons-material/List';
import Divider from "@mui/material/Divider"
import { Link, useLocation } from "react-router-dom";
import { createGroupLists, createGroupMembers, createGroups, deleteGroups, fetchEventListsByUser, fetchGroupsByUser } from "../Services/WebService";
import GroupPopupComponent from "./GroupPopupComponent"
import GroupCreateComponent from "./GroupCreateComponent";

/*
    TODO: Create buttons for each event list + the event list creating popup
*/

const MenuSidebarComponent = ({ selectedUserID }) => {
    const location = useLocation();
    const { username, email } = location.state || "";
    const [groups, setGroups] = useState([]);
    const [eventLists, setEventLists] = useState([]);
    const [selectedGroupID, setSelectedGroupID] = useState();
    const [selectedGroupName, setSelectedGroupName] = useState();
    const [loading, setLoading] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    const [openCreateGroup, setOpenCreateGroup] = useState(false);

    useEffect(() => { }, [selectedGroupName]); // Dependency on selectedGroupName
    useEffect(() => { }, [selectedGroupID]); // Dependency on selectedGroupID

    useEffect(() => {
        const getGroups = async () => {
            try {
                const groupData = await fetchGroupsByUser(selectedUserID)
                    .then(groupData => {
                        setGroups(groupData.data);  // update state with fetched groups
                        setLoading(false);
                    });
            } catch (error) {
                console.error("Failed to fetch groups: " + error);
            }
        }

        getGroups();    // call the async function
    }, []); // Empty dependency array means this effect runs only once

    useEffect(() => {
        const getEventLists = async () => {
            try {
                const eventListData = await fetchEventListsByUser(selectedUserID)
                    .then(eventListData => {
                        setEventLists(eventListData.data);  // update state with fetched groups
                        setLoading(false);
                    });
            } catch (error) {
                console.error("Failed to fetch groups: " + error);
            }
        }

        getEventLists();    // call the async function
    }, []); // Empty dependency array means this effect runs only once

    if (loading) {
        return (
            <div className="LoadingContainer">
                <CircularProgress />
            </div>
        );
    }

    const handleOpenGroup = (groupName, groupID) => {
        setSelectedGroupName(groupName);
        setSelectedGroupID(groupID);
        setOpenPopup(true);
    }

    const handleCloseGroup = () => {
        setOpenPopup(false);
    }

    const handleOpenCreateGroup = () => {
        setOpenCreateGroup(true);
    }

    const handleCloseCreateGroup = () => {
        setOpenCreateGroup(false);
    }

    const handleCreateGroup = (groupName) => {
        createGroups({
            name: groupName,
            admin: selectedUserID
        });
    }

    const handleAddMembers = (selectedMembers) => {
        for(const member of selectedMembers) {
            createGroupMembers(member, selectedGroupID);
        }
    }

    const handleAddLists = (selectedLists) => {
        for(const list of selectedLists) {
            console.log(list);
            createGroupLists(selectedGroupID, list);
        }
    }

    const handleDeleteGroup = () => {
        deleteGroups(selectedGroupID);
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
                            <ListItem><PersonIcon /><b>{username}</b></ListItem>
                            <ListItem>{email}</ListItem>
                        </List>
                    </ListItem>
                    <Divider />
                    <ListItem><GroupsIcon /><b>Groups</b></ListItem>
                    <Divider variant="middle" />
                    <ListItem>
                        <List>
                            {groups.map(group => (
                                <ListItem key={group.id} value={group.id}>
                                    <Button onClick={() => handleOpenGroup(group.name, group.id)}>{group.name}</Button>
                                </ListItem>
                            ))}
                            <ListItem>
                                <Button onClick={handleOpenCreateGroup}>Create new group...</Button>
                            </ListItem>
                        </List>
                    </ListItem>
                    <Divider />
                    <ListItem><ListIcon /><b>Event lists</b></ListItem>
                    <Divider variant="middle" />
                    <ListItem>
                        <List>
                            {eventLists.map(eventList => (
                                <ListItem key={eventList.id} value={eventList.id}>
                                    <Button onClick={() => handleOpenGroup(eventList.name, eventList.id)}>{eventList.name}</Button>
                                </ListItem>
                            ))}
                            <ListItem>
                                <Button>Create new list...</Button>
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
            {openPopup && (<GroupPopupComponent
                openPopup={openPopup}
                handleClosePopup={handleCloseGroup}
                requestAddMembers={handleAddMembers}
                requestAddLists={handleAddLists}
                requestDeleteGroup={handleDeleteGroup}
                selectedUserID={selectedUserID}
                groupName={selectedGroupName}
                groupID={selectedGroupID}
            />)}
            {openCreateGroup && (<GroupCreateComponent
                openCreateGroup={openCreateGroup}
                handleCloseCreateGroup={handleCloseCreateGroup}
                requestCreate={handleCreateGroup}
                eventLists={eventLists}
            />)}
        </>
    );
}

export default MenuSidebarComponent;
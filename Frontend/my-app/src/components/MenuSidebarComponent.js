import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"
import GroupsIcon from "@mui/icons-material/Groups"
import ListIcon from '@mui/icons-material/List';
import Divider from "@mui/material/Divider"
import { Link, useLocation } from "react-router-dom";
import { createEventLists, createGroupLists, createGroupMembers, createGroups, deleteEventLists, deleteGroups, editEventLists, editGroups, fetchEventListsInGroupsByUser, fetchGroupsByUser, fetchOwnedEventListsByUser } from "../Services/WebService";
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
    const [selectedList, setSelectedList] = useState();
    const [selectedGroupID, setSelectedGroupID] = useState();
    const [selectedGroupName, setSelectedGroupName] = useState();
    const [listName, setListName] = useState();
    const [loading, setLoading] = useState(true);
    const [openGroup, setOpenGroup] = useState(false);
    const [openCreateGroup, setOpenCreateGroup] = useState(false);
    const [openEditGroup, setOpenEditGroup] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [openCreateList, setOpenCreateList] = useState(false);
    const [openEditList, setOpenEditList] = useState(false);
    const [openDeleteList, setOpenDeleteList] = useState(false);

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
                const eventListData = await fetchOwnedEventListsByUser(selectedUserID)
                    .then(eventListData => {
                        setEventLists(eventListData.data);  // update state with fetched groups
                        setLoading(false);
                    });
            } catch (error) {
                console.error("Failed to fetch event lists: " + error);
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

    // Group Popup
    const handleOpenGroup = (groupName, groupID) => {
        setSelectedGroupName(groupName);
        setSelectedGroupID(groupID);
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

    const handleCreateGroup = (groupName) => {
        createGroups({
            name: groupName,
            admin: selectedUserID
        });
    }

    const handleEditGroup = (groupID, groupName) => {
        editGroups({
            id: groupID,
            name: groupName
        });
    }

    // Add members
    const handleAddMembers = (selectedMembers) => {
        for (const member of selectedMembers) {
            createGroupMembers(member, selectedGroupID);
        }
    }

    // Add lists
    const handleAddLists = (selectedLists) => {
        for (const list of selectedLists) {
            createGroupLists(selectedGroupID, list);
        }
    }

    // Delete Group
    const handleDeleteGroup = () => {
        deleteGroups(selectedGroupID);
    }

    // List Popup
    const handleOpenList = (list) => {
        setSelectedList(list);
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

    const handleCreateList = () => {
        createEventLists({
            name: listName,
            admin: selectedUserID
        })
        setOpenCreateList(false);
    }

    // Edit List Popup
    const handleOpenEditList = () => {
        setOpenEditList(true);
    }

    const handleCloseEditList = () => {
        setOpenEditList(false);
    }

    const handleEditList = () => {
        editEventLists({
            id: selectedList.id,
            name: listName
        })
        setOpenCreateList(false);
    }

    // Delete List Popup
    const handleOpenDeleteList = () => {
        setOpenDeleteList(true);
    }

    const handleCloseDeleteList = () => {
        setOpenDeleteList(false);
    }

    const handleDeleteList = () => {
        deleteEventLists(selectedList.id)
        setOpenDeleteList(false);
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
                openPopup={openGroup}
                handleClosePopup={handleCloseGroup}
                requestAddMembers={handleAddMembers}
                requestAddLists={handleAddLists}
                requestEditGroup={handleEditGroup}
                requestDeleteGroup={handleDeleteGroup}
                selectedUserID={selectedUserID}
                groupName={selectedGroupName}
                groupID={selectedGroupID}
            />)}
            {openCreateGroup && (<GroupCreateComponent
                openCreateGroup={openCreateGroup}
                handleCloseCreateGroup={handleCloseCreateGroup}
                requestCreate={handleCreateGroup}
            />)}
            {openEditGroup && (<GroupEditComponent
                openEditGroup={openEditGroup}
                handleCloseEditGroup={handleCloseEditGroup}
                requestEdit={handleEditGroup}
            />)}
            {openList && (
                <Dialog
                    open={openList}
                    onClose={handleCloseList}
                >
                    <DialogTitle>
                        {selectedList.name}
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            <ListItem>Admin</ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText
                                    primary={username}
                                    secondary={email}
                                />
                            </ListItem>
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseList}>Cancel</Button>
                        <Button onClick={handleOpenEditList}>Edit</Button>
                        <Button color="error" onClick={handleOpenDeleteList}>Delete</Button>
                    </DialogActions>
                </Dialog>
            )}
            {openCreateList && (
                <Dialog
                    open={openCreateList}
                    onClose={handleCloseCreateList}
                >
                    <DialogTitle>Create a new list</DialogTitle>
                    <DialogContent>
                        <TextField
                            label={"Enter list name..."}
                            onChange={(event) => setListName(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseCreateList}>Cancel</Button>
                        <Button variant="contained" onClick={handleCreateList}>Add</Button>
                    </DialogActions>
                </Dialog>
            )}
            {openEditList && (
                <Dialog
                    open={openEditList}
                    onClose={handleCloseEditList}
                >
                    <DialogTitle>Edit list</DialogTitle>
                    <DialogContent>
                        <TextField
                            label={"Enter list name..."}
                            value={selectedList.name}
                            onChange={(event) => setListName(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEditList}>Cancel</Button>
                        <Button variant="contained" onClick={handleEditList}>Add</Button>
                    </DialogActions>
                </Dialog>
            )}
            {openDeleteList && (
                <Dialog
                    open={openDeleteList}
                    onClose={handleCloseDeleteList}
                >
                    <DialogTitle>
                        Delete "{selectedList.name}"?
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this list?
                        If this event is deleted, it cannot be recovered.
                    </DialogContent>
                    <DialogActions>
                        <Button variant="text" onClick={handleDeleteList}>Yes</Button>
                        <Button onClick={handleCloseDeleteList}>No</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default MenuSidebarComponent;
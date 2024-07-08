import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { createGroupMembers, fetchEventListsByUser, fetchUsers } from "../Services/WebService";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

const GroupPopupComponent = ({ openPopup, handleClosePopup, requestAddMembers, requestAddLists, requestDeleteGroup, groupName, groupID, selectedUserID }) => {
    const [users, setUsers] = useState([]);
    const [lists, setLists] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddMembers, setOpenAddMembers] = useState(false);
    const [openAddLists, setOpenAddLists] = useState(false);
    const [openDeleteGroup, setOpenDeleteGroup] = useState(false);

    useEffect(() => {
        // Define an async function inside useEffect
        const getUsers = async () => {
            try {
                const usersData = await fetchUsers()
                    .then(usersData => {
                        setUsers(usersData.data); // Update state with fetched users
                        setLoading(false);
                    }); // Assuming fetchUsers returns a promise
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        getUsers(); // Call the async function
    }, []); // Empty dependency array means this effect runs only once

    useEffect(() => {
        // Define an async function inside useEffect
        const getLists = async () => {
            try {
                const listData = await fetchEventListsByUser(selectedUserID)
                    .then(listData => {
                        setLists(listData.data); // Update state with fetched users
                        setLoading(false);
                    }); // Assuming fetchUsers returns a promise
            } catch (error) {
                console.error("Failed to fetch event lists:", error);
            }
        };

        getLists(); // Call the async function
    }, []); // Empty dependency array means this effect runs only once

    if (loading) {
        return (
            <div className="LoadingContainer">
                <CircularProgress />
            </div>
        );
    }

    const filterUsersByGroupID = () => {
        return users.filter(user => user.groups.includes(groupID));
    };

    // TODO: Check why this works
    const filterListsByGroupID = () => {
        return lists.filter(list => Array.isArray(list.groups) && list.groups.includes(groupID));
    }

    const handleOpenDeleteGroup = () => {
        setOpenDeleteGroup(true);
    };

    const handleCloseDeleteGroup = () => {
        setOpenDeleteGroup(false);
    };

    const handleDelete = () => {
        setOpenDeleteGroup(false);
        handleClosePopup();
        requestDeleteGroup();
    };

    const handleOpenAddMembers = () => {
        setOpenAddMembers(true);
    };

    const handleMemberChange = (event) => {
        const {
            target: { value },
        } = event;
        setMembers(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCloseAddMembers = () => {
        setOpenAddMembers(false);
    }

    const handleAddMembers = () => {
        requestAddMembers(members);
        setOpenAddMembers(false);
    }

    const handleOpenAddLists = () => {
        setOpenAddLists(true);
    };

    const handleListChange = (event) => {
        const {
            target: { value },
        } = event;
        setLists(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCloseAddLists = () => {
        setOpenAddLists(false);
    }

    const handleAddLists = () => {
        requestAddLists(lists);
        setOpenAddLists(false);
    }

    return (
        <>
            <Dialog
                open={openPopup}
                onClose={handleClosePopup}
            >
                <DialogTitle>
                    {groupName}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <List>
                        <ListItem>
                            Members
                        </ListItem>
                        <Divider />
                        {filterUsersByGroupID().map(user => (
                            <ListItem key={user.id} value={user.id}>
                                <ListItemText primary={user.name} secondary={user.email} />
                            </ListItem>
                        ))}
                        <ListItem>
                            <Button onClick={handleOpenAddMembers}>Add new members...</Button>
                        </ListItem>
                        <ListItem>
                            <Button>Edit</Button>
                            <Button color="error" onClick={handleOpenDeleteGroup}>Delete</Button>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem>Event lists</ListItem>
                        <Divider />
                        {filterListsByGroupID().map(list => (
                            <ListItem key={list.id} value={list.id}>
                                <ListItemText primary={list.name} />
                            </ListItem>
                        ))}
                        <ListItem>
                            <Button onClick={handleOpenAddLists}>Add new lists...</Button>
                        </ListItem>
                        <ListItem>
                            <Button>Edit</Button>
                            <Button color="error" onClick={handleOpenDeleteGroup}>Delete</Button>
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup}>Cancel</Button>
                    <Button color="error">Leave</Button>
                </DialogActions>
            </Dialog>
            {openDeleteGroup && (
                <Dialog
                    open={openDeleteGroup}
                    onClose={handleCloseDeleteGroup}
                >
                    <DialogTitle>
                        Delete "{groupName}"?
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this group?
                        If this group is deleted, it cannot be recovered.
                    </DialogContent>
                    <DialogActions>
                        <Button variant="text" onClick={handleDelete}>Yes</Button>
                        <Button onClick={handleCloseDeleteGroup}>No</Button>
                    </DialogActions>
                </Dialog>
            )}
            {openAddMembers && (
                <Dialog
                    open={openAddMembers}
                    onClose={handleCloseAddMembers}
                >
                    <DialogTitle>
                        Add new members
                    </DialogTitle>
                    <DialogContent>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Enter group members...</InputLabel>
                            <Select
                                multiple
                                value={members}
                                onChange={handleMemberChange}
                                label="Enter group members..."
                            >
                                {users.map(user => (
                                    <MenuItem key={user.id} value={user.id}>
                                        <ListItemText primary={user.name} secondary={user.email} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAddMembers}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddMembers}>Apply</Button>
                    </DialogActions>
                </Dialog>
            )}
            {openAddLists && (
                <Dialog
                    open={openAddLists}
                    onClose={handleCloseAddLists}
                >
                    <DialogTitle>
                        Add new lists
                    </DialogTitle>
                    <DialogContent>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Enter group lists...</InputLabel>
                            <Select
                                multiple
                                value={lists}
                                onChange={handleListChange}
                                label="Enter group lists..."
                            >
                                {lists.map(list => (
                                    <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAddLists}>Cancel</Button>
                        <Button variant="contained" onClick={handleAddLists}>Apply</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default GroupPopupComponent;
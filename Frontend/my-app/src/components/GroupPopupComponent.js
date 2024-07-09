import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { fetchEventListsInGroupsByUser, fetchGroupMembers, fetchOwnedEventListsByUser, fetchUsers } from "../Services/WebService";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';

const GroupPopupComponent = ({ open, handleClose, requestAddMembers, requestLeave, requestAddLists, requestEdit, requestDelete, selectedUserID, groupName, groupID, admin }) => {
    // Django API Resources
    const [users, setUsers] = useState([]);
    const [ownedLists, setOwnedLists] = useState([]);
    const [memberList, setMemberList] = useState([]);

    // Group Elements
    const [members, setMembers] = useState([]);
    const [groupLists, setGroupLists] = useState([]);

    // Editor Variables
    const [selectedLists, setSelectedLists] = useState([]);
    const [name, setName] = useState(groupName);

    // Rendering
    const [loading, setLoading] = useState(true);
    const [openAddMembers, setOpenAddMembers] = useState(false);
    const [openAddLists, setOpenAddLists] = useState(false);
    const [openEditGroup, setOpenEditGroup] = useState(false);
    const [openDeleteGroup, setOpenDeleteGroup] = useState(false);
    const [openLeaveGroup, setOpenLeaveGroup] = useState(false);
    const [openAdminError, setOpenAdminError] = useState(false);
    const memberData = memberList.find(member => member.user == selectedUserID && member.group == groupID);

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
        const getGroupLists = async () => {
            try {
                const groupListData = await fetchEventListsInGroupsByUser(selectedUserID)
                    .then(groupListData => {
                        setGroupLists(groupListData.data); // Update state with fetched users
                        setLoading(false);
                    }); // Assuming fetchUsers returns a promise
            } catch (error) {
                console.error("Failed to fetch event lists:", error);
            }
        };

        getGroupLists(); // Call the async function
    }, []); // Empty dependency array means this effect runs only once

    useEffect(() => {
        // Define an async function inside useEffect
        const getOwnedLists = async () => {
            try {
                const ownedListData = await fetchOwnedEventListsByUser(selectedUserID)
                    .then(ownedListData => {
                        setOwnedLists(ownedListData.data); // Update state with fetched users
                        setLoading(false);
                    }); // Assuming fetchUsers returns a promise
            } catch (error) {
                console.error("Failed to fetch owned event lists:", error);
            }
        };

        getOwnedLists(); // Call the async function
    }, []); // Empty dependency array means this effect runs only once

    useEffect(() => {
        // Define an async function inside useEffect
        const getMembers = async () => {
            try {
                const membersData = await fetchGroupMembers()
                    .then(membersData => {
                        setMemberList(membersData.data); // Update state with fetched users
                        setLoading(false);
                    }); // Assuming fetchUsers returns a promise
            } catch (error) {
                console.error("Failed to fetch member list:", error);
            }
        };

        getMembers(); // Call the async function
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

    const filterListsByGroupID = () => {
        return groupLists.filter(groupList => groupList.groups.includes(groupID));
    }

    const handleOpenEdit = () => {
        setOpenEditGroup(true);
    };

    const handleCloseEdit = () => {
        setOpenEditGroup(false);
    };

    const handleEdit = () => {
        requestEdit(groupID, name, selectedUserID);
        setOpenEditGroup(false);
    }

    const handleOpenDelete = () => {
        setOpenDeleteGroup(true);
    };

    const handleCloseDelete = () => {
        setOpenDeleteGroup(false);
    };

    const handleDelete = () => {
        setOpenDeleteGroup(false);
        handleClose();
        requestDelete();
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
        setSelectedLists(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCloseAddLists = () => {
        setOpenAddLists(false);
    }

    const handleAddLists = () => {
        requestAddLists(selectedLists);
        setOpenAddLists(false);
    }

    const handleOpenLeaveGroup = () => {
        setOpenLeaveGroup(true);
    };

    const handleCloseLeaveGroup = () => {
        setOpenLeaveGroup(false);
    }

    const handleLeave = () => {
        if (memberData.user == admin) {
            handleOpenAdminError();
        } else {
            requestLeave(memberData.id);
            setOpenLeaveGroup(false);
            handleClose();
        }
    }

    const handleOpenAdminError = () => {
        setOpenAdminError(true);
    };

    const handleCloseAdminError = () => {
        setOpenAdminError(false);
        setOpenLeaveGroup(false);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
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
                                {user.id == admin && <KeyIcon/>}
                            </ListItem>
                        ))}
                        <ListItem>
                            {memberData.user == admin && (
                                <Button onClick={handleOpenAddMembers}>Add new members...</Button>
                            )}
                        </ListItem>
                    </List>
                    <List>
                        <ListItem>Event lists</ListItem>
                        <Divider />
                        {filterListsByGroupID().map(groupList => (
                            <ListItem key={groupList.id} value={groupList.id}>
                                <ListItemText primary={groupList.name} />
                            </ListItem>
                        ))}
                        <ListItem>
                            {memberData.user == admin && (
                                <Button onClick={handleOpenAddLists}>Add new lists...</Button>
                            )}
                        </ListItem>
                    </List>
                    {memberData.user == admin && (<>
                        <Button onClick={handleOpenEdit}>Edit</Button>
                        <Button color="error" onClick={handleOpenDelete}>Delete</Button>
                    </>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={handleOpenLeaveGroup}>Leave</Button>
                </DialogActions>
            </Dialog>
            {openEditGroup && (
                <Dialog
                    open={openEditGroup}
                    onClose={handleCloseEdit}
                >
                    <DialogTitle>
                        Edit group name
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label={"Enter group name..."}
                            defaultValue={groupName}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit}>Cancel</Button>
                        <Button variant="contained" onClick={handleEdit}>Apply</Button>
                    </DialogActions>
                </Dialog>
            )}
            {openDeleteGroup && (
                <Dialog
                    open={openDeleteGroup}
                    onClose={handleCloseDelete}
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
                        <Button onClick={handleCloseDelete}>No</Button>
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
                                {users.filter(user => !user.groups.includes(groupID)).map(user => (
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
                                value={selectedLists}
                                onChange={handleListChange}
                                label="Enter group lists..."
                            >
                                {ownedLists.map(ownedList => (
                                    <MenuItem key={ownedList.id} value={ownedList.id}>{ownedList.name}</MenuItem>
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
            {openLeaveGroup && (
                <Dialog
                    open={openLeaveGroup}
                    onClose={handleCloseLeaveGroup}
                >
                    <DialogTitle>
                        Leave "{groupName}"?
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to leave this group?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseLeaveGroup}>No</Button>
                        <Button onClick={handleLeave}>Yes</Button>
                    </DialogActions>
                </Dialog>
            )}
            {openAdminError && (
                <Dialog
                    open={openAdminError}
                    onClose={handleCloseAdminError}
                >
                    <DialogTitle>
                        Not allowed to leave group
                    </DialogTitle>
                    <DialogContent>
                        You are not allowed to leave this group because of your admin role.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseAdminError}>Ok</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default GroupPopupComponent;
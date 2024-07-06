import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem } from "@mui/material";
import { fetchUsers } from "../Services/WebService";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";

const GroupPopupComponent = ({ openPopup, handleClosePopup, groupName, groupID }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="LoadingContainer">
                <CircularProgress />
            </div>
        );
    }

    const filterUsersByGroupId = () => {
        return users.filter(user => user.groups.includes(groupID));
    }

    return (
        <Dialog
            open={openPopup}
            onClose={handleClosePopup}
        >
            <DialogTitle>
                {groupName}
            </DialogTitle>
            <Divider />
            <DialogContent>
                Members
                <Divider />
                <List>
                    {filterUsersByGroupId().map(user => (
                        <ListItem key={user.id} value={user.id}>{user.name} ({user.email})</ListItem>
                    ))}
                    <ListItem>
                        <Button>Edit</Button>
                        <Button color="error">Delete</Button>
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClosePopup}>Cancel</Button>
                <Button color="error">Leave group</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GroupPopupComponent;
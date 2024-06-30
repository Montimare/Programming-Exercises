import { Button, CircularProgress, Divider, FormControl, InputLabel, List, ListItem, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchUsers, fetchEvents } from "./WebService";
import { useEffect, useState } from "react";
import "./UserSelectionComponent.css"

const UserSelectionComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserID, setSelectedUserID] = useState();

    useEffect(() => {
        // Define an async function inside useEffect
        const getUsers = async () => {
            try {
                const usersData = await fetchUsers()
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
        return <CircularProgress />
    }

    const handleUserSelection = (event) => {
        setSelectedUserID(event.target.value);
    }

    return (
        <div className="UserSelectionPage">
            <div className="UserSelectionBox">
                <h1 className="UserSelectionTitle">Select Username</h1>
                <Divider />
                <div className="SelectContainer">
                    <FormControl sx={{ marginTop: "20px", minWidth: 300, justifyContent: "center" }}>
                        <InputLabel>Choose user...</InputLabel>
                        <Select 
                            label="Choose user..."
                            value={selectedUserID}
                            onChange={handleUserSelection}
                        >
                            {users.map(user => (
                                <MenuItem key={user.id} value={user.id}>{user.name} ({user.email})</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="SelectButtonContainer">
                    <Link to={"/calendar/" + selectedUserID}>
                        <Button variant="contained" size="large">Select</Button>
                    </Link>
                </div>
                <Divider />
                <div className="RegisterOptionContainer">
                    No account?&nbsp;<Link to={"/register"}>Register here</Link>
                </div>
            </div>
        </div>
    );
}

export default UserSelectionComponent;
import { Button, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers } from "../Services/WebService";
import { useEffect, useState } from "react";
import "./UserSelectionComponent.css"

const UserSelectionComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUserID, setSelectedUserID] = useState("");
    const navigate = useNavigate();

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

    const handleUserSelection = (event) => {
        setSelectedUserID(event.target.value);
    };

    const handleSelectClick = () => {
        const userDetails = users.find(user => user.id === selectedUserID);
        if (userDetails) {
            navigate('/calendar/' + selectedUserID, { state: { username: userDetails.name, email: userDetails.email } });
        } else {
            console.error("User details not found!");
        }
    };

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
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSelectClick}
                    >
                        Select
                    </Button>
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
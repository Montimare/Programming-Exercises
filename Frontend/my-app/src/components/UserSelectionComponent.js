import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import fetchUsers, { fetchEvents } from "./WebService";
import { useEffect, useState } from "react";

const UserSelectionComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Define an async function inside useEffect
        const getUsers = async () => {
            try {
                const usersData = await fetchEvents()
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

    return (
        <>
            <h1>User Selection</h1>
            <Link to={"/calendar"}>
                <Button>Select</Button>
            </Link>
            <div>
                {JSON.stringify(users)}
            </div>
        </>
    );
}

export default UserSelectionComponent;
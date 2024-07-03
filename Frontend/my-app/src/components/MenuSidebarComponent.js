import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, List, ListItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"
import GroupsIcon from "@mui/icons-material/Groups"
import Divider from "@mui/material/Divider"
import { Link, useLocation } from "react-router-dom";
import { fetchGroupsByUser } from "../Services/WebService";
import GroupPopupComponent from "./GroupPopupComponent"

const MenuSidebarComponent = ({ selectedUserID }) => {
    const location = useLocation();
    const { username, email } = location.state || "";
    const [groups, setGroups] = useState([]);
    const [selectedGroupID, setSelectedGroupID] = useState();
    const [selectedGroupName, setSelectedGroupName] = useState();
    const [loading, setLoading] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);

    useEffect(() => {}, [selectedGroupName]); // Dependency on selectedGroupName
    useEffect(() => {}, [selectedGroupID]); // Dependency on selectedGroupID

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

    if (loading) {
        return (
            <div className="LoadingContainer">
                <CircularProgress />
            </div>
        );
    }

    const handleOpenPopup = (groupName, groupID) => {
        setSelectedGroupName(groupName);
        setSelectedGroupID(groupID);
        setOpenPopup(true);
    }

    const handleClosePopup = () => {
        setOpenPopup(false);
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
                                    <Button onClick={() => handleOpenPopup(group.name, group.id)}>{group.name}</Button>
                                </ListItem>
                            ))}
                            <ListItem>
                                <Button>Create new group...</Button>
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
                handleClosePopup={handleClosePopup}
                groupName={selectedGroupName}
                groupID={selectedGroupID}
            />)}
        </>
    );
}

export default MenuSidebarComponent;
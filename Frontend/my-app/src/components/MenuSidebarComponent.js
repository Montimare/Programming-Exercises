import React from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"
import GroupsIcon from "@mui/icons-material/Groups"
import Divider from "@mui/material/Divider"
import { Link, useLocation } from "react-router-dom";

const MenuSidebarComponent = () => {
    const location = useLocation();
    const { username, email, groups } = location.state || {};

    return (
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
                <Divider variant="middle"/>
                <ListItem>
                    <List>
                        {groups.map(group => (
                            <ListItem key={group.id} value={group.id}>{}</ListItem>
                        ))}
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
    );
}

export default MenuSidebarComponent;
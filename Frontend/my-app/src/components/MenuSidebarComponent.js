import React from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person"
import GroupsIcon from "@mui/icons-material/Groups"
import Divider from "@mui/material/Divider"

const MenuSidebarComponent = () => {
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
                        <ListItem><b>User</b><PersonIcon /></ListItem>
                        <ListItem>user@user.user</ListItem>
                    </List>
                </ListItem>
                <Divider />
                <ListItem><b>Groups</b><GroupsIcon /></ListItem>
                <Divider variant="middle"/>
                <ListItem>
                    <List>
                        <ListItem>Group1</ListItem>
                        <ListItem>Group2</ListItem>
                        <ListItem>Group3</ListItem>
                    </List>
                </ListItem>
                <Divider />
                <ListItem>
                    <Button variant="text" color="error">Log out</Button>
                </ListItem>
            </List>
        </Box>
    );
}

export default MenuSidebarComponent;
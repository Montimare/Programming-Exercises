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
                <ListItem>User<PersonIcon/></ListItem>
                <Divider/>
                <ListItem>Groups<GroupsIcon/></ListItem>
                <Divider/>
                <ListItem>
                    <Button variant="text" color="error">Log out</Button>
                </ListItem>
            </List>
        </Box>
    );
}

export default MenuSidebarComponent;
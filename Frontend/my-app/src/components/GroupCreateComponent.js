import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUsers } from "../Services/WebService";

const GroupCreateComponent = ({ openCreateGroup, handleCloseCreateGroup, requestCreate }) => {
    const [groupName, setGroupName] = useState("My Group");

    const handleCreate = () => {
        requestCreate(groupName);
        handleCloseCreateGroup();
    };

    return (
        <Dialog
            open={openCreateGroup}
            onClose={handleCloseCreateGroup}
        >
            <DialogTitle>
                Create new group
            </DialogTitle>
            <DialogContent>
                <TextField
                    label={"Enter group name..."}
                    onChange={(event) => setGroupName(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseCreateGroup}>Cancel</Button>
                <Button variant="contained" onClick={handleCreate}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default GroupCreateComponent;
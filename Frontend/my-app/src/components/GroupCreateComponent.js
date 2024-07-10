import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUsers } from "../Services/WebService";

const GroupCreateComponent = ({ open, handleClose, requestCreate }) => {
    const [groupName, setGroupName] = useState("My Group");

    const handleCreate = () => {
        requestCreate(groupName);
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                Create new group
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <TextField
                    label={"Enter group name..."}
                    onChange={(event) => setGroupName(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleCreate}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default GroupCreateComponent;
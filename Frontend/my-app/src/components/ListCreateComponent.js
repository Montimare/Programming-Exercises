import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from "@mui/material";
import { useState } from "react";

const ListCreateComponent = ({ open, handleClose, requestCreate }) => {
    const [name, setName] = useState("My List");

    const handleCreate = () => {
        requestCreate(name);
        handleClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Create a new list</DialogTitle>
            <Divider/>
            <DialogContent>
                <TextField
                    label={"Enter list name..."}
                    onChange={(event) => setName(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleCreate}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ListCreateComponent;
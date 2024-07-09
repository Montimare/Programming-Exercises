import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useState } from "react";

const ListPopupComponent = ({ open, selectedList, selectedListName, handleClose, requestEdit, requestDelete, username, email }) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [name, setName] = useState();

    // Edit List Popup
    const handleOpenEdit = () => {
        setOpenEdit(true);
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
    }

    const handleEdit = () => {
        requestEdit(name);
        setOpenEdit(false);
    }

    // Delete List Popup
    const handleOpenDelete = () => {
        setOpenDelete(true);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    const handleDelete = () => {
        requestDelete();
        setOpenDelete(false);
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {selectedListName}
                </DialogTitle>
                <DialogContent>
                    <List>
                        <ListItem>Admin</ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={username}
                                secondary={email}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleOpenEdit}>Edit</Button>
                    <Button color="error" onClick={handleOpenDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
            {openEdit && (
                <Dialog
                    open={openEdit}
                    onClose={handleCloseEdit}
                >
                    <DialogTitle>Edit list name</DialogTitle>
                    <DialogContent>
                        <TextField
                            label={"Enter list name..."}
                            defaultValue={selectedList.name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit}>Cancel</Button>
                        <Button variant="contained" onClick={handleEdit}>Apply</Button>
                    </DialogActions>
                </Dialog>
            )}
            {openDelete && (
                <Dialog
                    open={openDelete}
                    onClose={handleCloseDelete}
                >
                    <DialogTitle>
                        Delete "{selectedList.name}"?
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this list?
                        If this event is deleted, it cannot be recovered.
                    </DialogContent>
                    <DialogActions>
                        <Button variant="text" onClick={handleDelete}>Yes</Button>
                        <Button onClick={handleCloseDelete}>No</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default ListPopupComponent;
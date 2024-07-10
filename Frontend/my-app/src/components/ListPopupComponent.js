import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemText, TextField } from "@mui/material";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';

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
                    <IconButton onClick={handleOpenEdit}>
                        <EditIcon />
                    </IconButton>
                </DialogTitle>
                <Divider/>
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
                    <Button color="error" onClick={handleOpenDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
            {openEdit && (
                <Dialog
                    open={openEdit}
                    onClose={handleCloseEdit}
                >
                    <DialogTitle>Edit list name</DialogTitle>
                    <Divider/>
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
                    <Divider/>
                    <DialogContent>
                        Are you sure you want to delete this list?<br/>
                        If this list is deleted, all events associated with it will also be erased with no chance of recovery.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDelete}>No</Button>
                        <Button variant="text" onClick={handleDelete}>Yes</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
}

export default ListPopupComponent;
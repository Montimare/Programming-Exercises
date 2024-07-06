import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, List, ListItem, Select, TextField } from "@mui/material";

const CreateGroupComponent = ({ openCreateGroup, handleCloseCreateGroup }) => {
    return (
        <Dialog
            open={openCreateGroup}
            onClose={handleCloseCreateGroup}
        >
            <DialogTitle>
                Create new group
            </DialogTitle>
            <DialogContent>
                <List>
                    <ListItem>
                        <TextField
                            label={"Enter group name..."}
                        />
                    </ListItem>
                    <ListItem>
                        <FormControl sx={{minWidth: 210}}>
                            <InputLabel>Enter group members...</InputLabel>
                            <Select
                                label={"Enter group members..."}
                            ></Select>
                        </FormControl>
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseCreateGroup}>Cancel</Button>
                <Button variant="contained">Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateGroupComponent;
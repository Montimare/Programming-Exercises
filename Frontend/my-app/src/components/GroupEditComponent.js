import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, List, ListItem, Select, TextField } from "@mui/material";

const GroupEditComponent = ({ openEditGroup, handleCloseEditGroup, groupName }) => {
    return (
        <Dialog
            open={openEditGroup}
            onClose={handleCloseEditGroup}
        >
            <DialogTitle>
                Edit "{groupName}"
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
                <Button onClick={handleCloseEditGroup}>Cancel</Button>
                <Button variant="contained">Apply</Button>
            </DialogActions>
        </Dialog>
    );
}

export default GroupEditComponent;
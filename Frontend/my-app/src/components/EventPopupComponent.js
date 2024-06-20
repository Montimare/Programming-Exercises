import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox, DialogActions, DialogContent, FormControl, InputLabel, ListItem, ListItemText, MenuItem, OutlinedInput, TextField } from '@mui/material';
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { TimePicker, DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import List from "@mui/material/List";

const EventPopupComponent = ({ open, setOpen, sendEventData }) => {
    const [text, setText] = React.useState([]);
    const [startTime, setStartTime] = React.useState([]);
    const [endTime, setEndTime] = React.useState([]);
    const [startDate, setStartDate] = React.useState([]);
    const [endDate, setEndDate] = React.useState([]);

    const groupNames = [
        "The Gang",
        "The Gang 2",
        "The Gang 3"
    ]

    const handleClose = () => {
        setOpen(false);
    }

    function emptyLocalData() {
        setText('');
        setStartTime(null);
        setEndTime(null);
        setStartDate(null);
        setEndDate(null);
    }

    const handleSave = () => {
        setOpen(false);
        sendEventData(text, startTime, endTime, startDate, endDate);
        emptyLocalData();
    }

    const [group, setGroup] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setGroup(
            typeof value === "string" ? value.split(',') : value,
        );
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="event-dialog-title"
            aria-describedby="event-dialog-description"
        >
            <DialogTitle id="event-dialog-title">
                {"Add new event"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Event name"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setText(event.target.value)}
                />
                <List>
                    <ListItem>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Choose start date..."
                                onChange={(newValue) => setStartDate(newValue.format("YYYY-MM-DD"))}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Choose start time..."
                                onChange={(newValue) => setStartTime(newValue.format("HH:mm:ss"))}
                            />
                        </LocalizationProvider>
                    </ListItem>
                    <ListItem>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Choose end date..."
                                onChange={(newValue) => setEndDate(newValue.format("YYYY-MM-DD"))}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Choose end time..."
                                onChange={(newValue) => setEndTime(newValue.format("HH:mm:ss"))}
                            />
                        </LocalizationProvider>
                    </ListItem>
                    <ListItem>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Group</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                value={group}
                                onChange={handleChange}
                                input={<OutlinedInput label="Group" />}
                                renderValue={(selected) => selected.join(',')}
                                MenuProps={[]}
                            >
                                {groupNames.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={group.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave} autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EventPopupComponent;
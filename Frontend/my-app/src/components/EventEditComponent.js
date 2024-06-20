import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox, DialogActions, DialogContent, FormControl, InputLabel, ListItem, ListItemText, MenuItem, OutlinedInput, TextField } from '@mui/material';
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { TimePicker, DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"
import List from "@mui/material/List";

const EventEditComponent = ({ open, setOpen, sendEventData, event }) => {
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

    const handleSave = () => {
        setOpen(false);
        sendEventData(text, startTime, endTime, startDate, endDate);
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
                {"Edit event"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Event name"
                    fullWidth
                    variant="standard"
                    defaultValue={event.title}
                    onChange={(newEvent) => setText(newEvent.target.value)}
                />
                <List>
                    <ListItem>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Choose start date..."
                                value={dayjs(event.start)}
                                onChange={(newValue) => setStartDate(newValue)}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Choose start time..."
                                value={dayjs(event.start)}
                                onChange={(newValue) => setStartTime(newValue)}
                            />
                        </LocalizationProvider>
                    </ListItem>
                    <ListItem>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Choose end date..."
                                value={dayjs(event.end)}
                                onChange={(newValue) => setEndDate(newValue)}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Choose end time..."
                                value={dayjs(event.end)}
                                onChange={(newValue) => setEndTime(newValue)}
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
                <Button variant="contained" onClick={handleSave} autoFocus>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EventEditComponent;
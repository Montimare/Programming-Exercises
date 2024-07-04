import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions, DialogContent, FormControl, InputLabel, ListItem, MenuItem, TextField } from '@mui/material';
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { TimePicker, DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"
import List from "@mui/material/List";
import { fetchEventListsByUser } from "../Services/WebService";
import CircularProgress from "@mui/material/CircularProgress";

const EventEditComponent = ({ selectedUserID, open, setOpen, sendEventData, requestDelete, event }) => {
    const [text, setText] = useState(event.title);
    const [startDate, setStartDate] = useState(dayjs(event.start).format("YYYY-MM-DD"));
    const [startTime, setStartTime] = useState(dayjs(event.start).format("HH:mm:ss"));
    const [endDate, setEndDate] = useState(dayjs(event.end).format("YYYY-MM-DD"));
    const [endTime, setEndTime] = useState(dayjs(event.end).format("HH:mm:ss"));
    const [eventList, setEventList] = useState([]);
    const [selectedList, setSelectedList] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Define an async function inside useEffect
        const getUserEvents = async () => {
            try {
                const eventListData = await fetchEventListsByUser(selectedUserID)
                    .then(eventListData => {
                        console.log("FETCHED DATA: ");
                        console.log(eventListData.data);
                        setEventList(eventListData.data); // Update state with fetched user events
                        setLoading(false);
                    }); // Assuming fetchEventsByUser returns a promise
            } catch (error) {
                console.error("Failed to fetch events for this user:", error);
            }
        };

        getUserEvents(); // Call the async function
    }, []); // Empty dependency array means this effect runs only once

    if (loading) {
        return (
            <div className="LoadingContainer">
                <CircularProgress />
            </div>
        );
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        setOpen(false);
        sendEventData(text, startTime, endTime, startDate, endDate);
    }

    const handleDelete = () => {
        setOpen(false);
        requestDelete();
    }

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
                                onChange={(newValue) => setStartDate(newValue.format("YYYY-MM-DD"))}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Choose start time..."
                                value={dayjs(event.start)}
                                onChange={(newValue) => setStartTime(newValue.format("HH:mm:ss"))}
                            />
                        </LocalizationProvider>
                    </ListItem>
                    <ListItem>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Choose end date..."
                                value={dayjs(event.end)}
                                onChange={(newValue) => setEndDate(newValue.format("YYYY-MM-DD"))}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Choose end time..."
                                value={dayjs(event.end)}
                                onChange={(newValue) => setEndTime(newValue.format("HH:mm:ss"))}
                            />
                        </LocalizationProvider>
                    </ListItem>
                    <ListItem>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Choose event list...</InputLabel>
                            <InputLabel>Choose event list...</InputLabel>
                            <Select
                                value={event.list}
                                onChange={(event) => setSelectedList(event.target.value)}
                                label={"Choose event list..."}
                            >
                                {eventList.map(eventListItem => (
                                    <MenuItem key={eventListItem.id} value={eventListItem.id}>
                                        {eventListItem.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="text" color="error" onClick={handleDelete}>Delete</Button>
                <Button variant="contained" onClick={handleSave} autoFocus>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EventEditComponent;
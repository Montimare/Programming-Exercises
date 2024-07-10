import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions, DialogContent, FormControl, InputLabel, ListItem, ListItemText, MenuItem, TextField } from '@mui/material';
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { TimePicker, DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs"
import List from "@mui/material/List";

const EventAddComponent = ({ ownedEventLists, open, setOpen, sendEventData, clickedDate }) => {
    const [text, setText] = useState("My Event");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [startDate, setStartDate] = useState(dayjs(clickedDate).format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(dayjs(clickedDate).format("YYYY-MM-DD"));
    const [selectedList, setSelectedList] = useState();

    const handleClose = () => {
        setOpen(false);
    }

    function emptyLocalData() {
        setText("My Event");
        setStartTime(null);
        setEndTime(null);
        setStartDate(null);
        setEndDate(null);
    }

    const handleSave = () => {
        setOpen(false);
        sendEventData(text, startTime, endTime, startDate, endDate, selectedList);
        emptyLocalData();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
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
                                value={dayjs(startDate)}
                                onChange={(newValue) => setStartDate(newValue.format("YYYY-MM-DD"))}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Choose start time..."
                                onChange={(newValue) => setStartTime(newValue.format("HH:mm:ssZ"))}
                            />
                        </LocalizationProvider>
                    </ListItem>
                    <ListItem>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Choose end date..."
                                value={dayjs(endDate)}
                                onChange={(newValue) => setEndDate(newValue.format("YYYY-MM-DD"))}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                                label="Choose end time..."
                                onChange={(newValue) => setEndTime(newValue.format("HH:mm:ssZ"))}
                            />
                        </LocalizationProvider>
                    </ListItem>
                    <ListItem>
                        <FormControl sx={{ minWidth: 200 }}>
                            <InputLabel>Choose event list...</InputLabel>
                            <Select
                                value={selectedList || ''}
                                onChange={(event) => setSelectedList(event.target.value)}
                                label={"Choose event list..."}
                            >
                                {ownedEventLists.map(eventListItem => (
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
                <Button variant="contained" onClick={handleSave} autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EventAddComponent;
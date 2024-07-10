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

const EventEditComponent = ({ ownedEventLists, open, setOpen, sendEventData, requestDelete, event, listID }) => {
    const [text, setText] = useState(event.title);
    const [startDate, setStartDate] = useState(dayjs(event.start).format("YYYY-MM-DD"));
    const [startTime, setStartTime] = useState(dayjs(event.start).format("HH:mm:ssZ"));
    const [endDate, setEndDate] = useState(dayjs(event.end).format("YYYY-MM-DD"));
    const [endTime, setEndTime] = useState(dayjs(event.end).format("HH:mm:ssZ"));
    const [selectedList, setSelectedList] = useState(listID);
    const [openDeletePopup, setOpenDeletePopup] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        setOpen(false);
        sendEventData(text, startTime, endTime, startDate, endDate, selectedList);
    }

    const handleDelete = () => {
        setOpenDeletePopup(false);
        setOpen(false);
        requestDelete();
    }

    const handleOpenDelete = () => {
        setOpenDeletePopup(true);
    }

    const handleCloseDelete = () => {
        setOpenDeletePopup(false);
    }

    return (
        <>
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
                                    onChange={(newValue) => setStartTime(newValue.format("HH:mm:ssZ"))}
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
                                    onChange={(newValue) => setEndTime(newValue.format("HH:mm:ssZ"))}
                                />
                            </LocalizationProvider>
                        </ListItem>
                        <ListItem>
                            <FormControl sx={{ minWidth: 200 }}>
                                <InputLabel>Choose event list...</InputLabel>
                                <Select
                                    value={listID}
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
                    <Button variant="text" color="error" onClick={handleOpenDelete}>Delete</Button>
                    <Button variant="contained" onClick={handleSave} autoFocus>Apply</Button>
                </DialogActions>
            </Dialog>
            {openDeletePopup && (
                <Dialog
                    open={openDeletePopup}
                    onClose={handleCloseDelete}
                >
                    <DialogTitle>
                        Delete "{event.title}"?
                    </DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this event?
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

export default EventEditComponent;
import './CalendarComponent.css'
import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox, DialogActions, DialogContent, FormControl, InputLabel, ListItem, ListItemText, MenuItem, OutlinedInput, TextField } from '@mui/material';
import Button from "@mui/material/Button";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Select from "@mui/material/Select"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';
import List from "@mui/material/List";

/*
    CalendarComponent
    Created by Klejdi Galushi using React.js
    =========================================================================
    USEFUL LINKS
    =========================================================================
    Event Display - https://fullcalendar.io/docs/event-display
    
    Awesome React - https://github.com/enaqx/awesome-react?tab=readme-ov-file
    React Summary - https://www.youtube.com/watch?v=Tn6-PIqc4UM
    
    COMPONENTS
    MUI - https://mui.com/material-ui/
    Bootstrap - https://getbootstrap.com/docs/5.3/getting-started/introduction/
*/

/*
    function (info) {
        const calendarAPI = calendarRef.current.getApi();
        calendarAPI.addEvent({
            title: 'hello',
            start: info.date
        })
    }
*/

// Temporarily storing event list in frontend
const eventList = [
    {
        title: 'Learning Session',
        start: '2024-05-08',
        end: '2024-05-12'
    },
    {
        title: 'Learning Session 2',
        start: '2024-05-08'
    },
    {
        title: 'Learning Session 3',
        start: '2024-05-08'
    },
    {
        title: 'Learning Session 4',
        start: '2024-05-08'
    },
    {
        title: 'Thing I Need To Do',
        start: '2024-05-09',
        end: '2024-05-10'
    },
    {
        title: 'Hello',
        start: '2024-05-11T12:30:00',
        allDay: false // will make the time show
    },
    {
        title: 'Hi',
        start: '2024-05-11T12:30:00',
        allDay: false // will make the time show
    },
    {
        title: 'Prog',
        start: '2024-05-11T12:30:00',
        allDay: false // will make the time show
    },
    {
        title: 'ProgEx',
        start: '2024-05-11T12:30:00',
        allDay: false // will make the time show
    }
]

const groupNames = [
    "The Gang",
    "The Gang 2",
    "The Gang 3"
]

const CalendarComponent = () => {
    const calendarRef = useRef(null);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const [text, setText] = React.useState([]);
    const [startTime, setStartTime] = React.useState([]);
    const [endTime, setEndTime] = React.useState([]);

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        setOpen(false);
        const calendarAPI = calendarRef.current.getApi();
        calendarAPI.addEvent({
            title: text,
            start: startTime.toISOString(),
            end: endTime.toISOString()
        });
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
        <>
            <header className="CalendarTitle">
                <CalendarMonthIcon />
                <h1 className="TitleText">Team Calendar</h1>
                <div className="UserText">User</div>
            </header>
            <body className="CalendarBody">
                <div className="CalendarOverview">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        aspectRatio={2}
                        firstDay={1}
                        dayMaxEventRows={true}
                        editable={true}
                        selectable={true}
                        events={eventList}
                        ref={calendarRef}

                        /* 
                            Using the eventClick function to modify an event
                            uses deprecated setProp method

                            TODO: Improve modifying events
                            (Event name, date, time, etc.)
                        */
                        eventClick={function (info) {
                            let title = prompt("Enter new title:");
                            if (title) {
                                info.event.setProp('title', title);
                            }
                            info.el.style.borderColor = 'red';
                        }}

                        dateClick={handleClickOpen}
                    />

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
                                value={text}
                                onChange={(event) => setText(event.target.value)}
                            />
                            <List>
                                <ListItem>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker 
                                            label="Start time"
                                            value={new dayjs(startTime)}
                                            onChange={(newValue) => setStartTime(newValue)}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker 
                                            label="End time"
                                            value={new dayjs(endTime)}
                                            onChange={(newValue) => setEndTime(newValue)}
                                        />
                                    </LocalizationProvider>
                                </ListItem>
                                <ListItem>
                                    <FormControl sx={{ minWidth: 200 }}>
                                        <InputLabel id="demo-multiple-checkbox-label">Choose group</InputLabel>
                                        <Select
                                            labelId="demo-multiple-checkbox-label"
                                            id="demo-multiple-checkbox"
                                            value={group}
                                            onChange={handleChange}
                                            input={<OutlinedInput label="Choose group" />}
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
                </div>
            </body>
            <footer className="CalendarFooter1">
                © 2024 ProgExTRAORDINAIRE
            </footer>
        </>
    );
};

export default CalendarComponent;
import './CalendarComponent.css'
import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventPopupComponent from "./EventPopupComponent";
import EventEditComponent from './EventEditComponent';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer"
import MenuSidebarComponent from './MenuSidebarComponent';

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
    Axios - https://axios-http.com/docs/intro

    TODO: Is useLocation useful?
    TODO: Implement Axios
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
        end: '2024-05-12T14:30:00'
    },
    {
        title: 'Hi',
        start: '2024-05-11T12:30:00'
    },
    {
        title: 'Prog',
        start: '2024-05-11T12:30:00'
    },
    {
        title: 'ProgEx',
        start: '2024-05-11T12:30:00'
    }
]

const CalendarComponent = () => {
    const calendarRef = useRef(null);

    const [openAddEvent, setOpenAddEvent] = React.useState(false);
    const [openEditEvent, setOpenEditEvent] = React.useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [event, setEvent] = React.useState(false);
    const [clickedDate, setClickedDate] = React.useState(false);

    const handleDateClick = (info) => {
        setClickedDate(info.date);
        setOpenAddEvent(true);
    }

    const handleEventClick = (info) => {
        setEvent(info.event);
        setOpenEditEvent(true);
    }

    const handleAddEvent = (text, startTime, endTime, startDate, endDate) => {
        const calendarAPI = calendarRef.current.getApi();
        let newEvent = null;
        if (startTime === null && endTime === null) {
            if(endDate === null) {
                newEvent = {
                    title: text,
                    start: startDate.toString()
                };
            } else {
                newEvent = {
                    title: text,
                    start: startDate.toString(),
                    end: endDate.toString()
                };
            }
        } else if(startTime === null && endTime !== null) {
            if(endDate === null) {
                newEvent = {
                    title: text,
                    start: startDate.toString()
                };
            } else {
                newEvent = {
                    title: text,
                    start: startDate.toString(),
                    end: endDate.toString() + "T" + endTime.toString("HH:mm:ssZ")
                };
            }
        } else if(startTime !== null && endTime === null) {
            if(endDate === null) {
                newEvent = {
                    title: text,
                    start: startDate.toString() + "T" + startTime.toString("HH:mm:ssZ")
                };
            } else {
                newEvent = {
                    title: text,
                    start: startDate.toString() + "T" + startTime.toString("HH:mm:ssZ"),
                    end: endDate.toString()
                };
            }
        } else {
            if(endDate === null) {
                newEvent = {
                    title: text,
                    start: startDate.toString() + "T" + startTime.toString("HH:mm:ssZ")
                };
            } else {
                newEvent = {
                    title: text,
                    start: startDate.toString() + "T" + startTime.toString("HH:mm:ssZ"),
                    end: endDate.toString() + "T" + endTime.toString("HH:mm:ssZ")
                };
            }
        }
        calendarAPI.addEvent(newEvent);
        eventList.push(newEvent);
    }

    const handleEditEvent = (text, startTime, endTime, startDate, endDate) => {
        // TODO: Add error handling when start or end time are undefined
        if (event) {
            let formattedStart = startDate.toString() + "T" + startTime.toString("HH:mm:ssZ");
            let formattedEnd = endDate.toString() + "T" + endTime.toString("HH:mm:ssZ");
            event.setProp('title', text);
            // TODO: Set start and end time
            event.setStart(formattedStart);
            event.setEnd(formattedEnd);
        } else {
            alert("Event not found!");
        }
    }

    const handleDeleteEvent = () => {
        if (event) {
            event.remove();
        } else {
            alert("Event not found!");
        }
    }

    const toggleDrawer = (newOpen) => {
        setOpenDrawer(newOpen);
    }

    return (
        <>
            <header className="CalendarTitle">
                <h1 className="TitleText">
                    <IconButton aria-label="menu" onClick={() => toggleDrawer(true)}>
                        <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                    Team Calendar  <CalendarMonthIcon />
                </h1>
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
                        eventClick={handleEventClick}
                        dateClick={handleDateClick}
                    />
                    <EventPopupComponent
                        open={openAddEvent}
                        setOpen={setOpenAddEvent}
                        clickedDate={clickedDate}
                        sendEventData={handleAddEvent}
                    />
                    <EventEditComponent
                        open={openEditEvent}
                        setOpen={setOpenEditEvent}
                        sendEventData={handleEditEvent}
                        requestDelete={handleDeleteEvent}
                        event={event}
                    />
                </div>
                <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
                    <MenuSidebarComponent />
                </Drawer>
            </body>
            <footer className="CalendarFooter">
                © 2024 ProgExTRAORDINAIRE
            </footer>
        </>
    );
};

export default CalendarComponent;
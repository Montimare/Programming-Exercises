import './CalendarComponent.css'
import React, { useRef, useEffect, useState } from "react";
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
import { useLocation, useParams } from "react-router-dom";
import { createEvents, editEvents, fetchEventsByUser } from "../Services/WebService";
import CircularProgress from "@mui/material/CircularProgress";

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

    // User data
    const [selectedUserID, setSelectedUserID] = useState(useParams().id);
    const location = useLocation();
    const username = location.state?.username || "";

    // Event add and modify popup openers
    const [openAddEvent, setOpenAddEvent] = useState(false);
    const [openEditEvent, setOpenEditEvent] = useState(false);

    // Menu sidebar opener
    const [openDrawer, setOpenDrawer] = useState(false);

    // Event-related
    const [event, setEvent] = useState([]);
    const [eventID, setEventID] = useState();
    const [listID, setListID] = useState();
    const [eventList, setEventList] = useState();
    const [clickedDate, setClickedDate] = useState(false);

    // Loading screen
    const [loading, setLoading] = useState(true);

    useEffect(() => { }, [event]);

    useEffect(() => {
        // Define an async function inside useEffect
        const getUserEvents = async () => {
            try {
                const userEventData = await fetchEventsByUser(selectedUserID)
                    .then(userEventData => {
                        setEventList(userEventData.data); // Update state with fetched user events
                        setLoading(false);
                    }); // Assuming fetchUsers returns a promise
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        getUserEvents(); // Call the async function
    }, []); // Empty dependency array means this effect runs only once

    const handleDateClick = (info) => {
        setClickedDate(info.date);
        setOpenAddEvent(true);
    }

    const findEventInEventList = (fcEvent) => {
        // Attempt to find a matching event in the eventList
        const matchingEvent = eventList.find(event =>
            event.title === fcEvent.title &&
            event.start === fcEvent.start &&
            event.end === fcEvent.end
        );
        console.log(matchingEvent);
        if (matchingEvent) {
            setEventID(matchingEvent.id);
            setListID(matchingEvent.list);
            return fcEvent;
        }
        // If no match is found, return null
        return null;
    }

    const handleEventClick = (info) => {
        info.event.setEnd(info.event.end === null ? info.event.start : info.event.end);
        setEvent(findEventInEventList(info.event)); // Call the function with the fcEvent parameter
        setOpenEditEvent(true);
    }

    const handleAddEvent = async (text, startTime, endTime, startDate, endDate, list) => {
        const calendarAPI = calendarRef.current.getApi();
        let newEvent = null;
        if (startTime === null && endTime === null) {
            newEvent = {
                title: text,
                start: startDate.toString(),
                end: endDate.toString(),
                list: list
            };
        } else if (startTime !== null && endTime === null) {
            newEvent = {
                title: text,
                start: startDate.toString() + "T" + startTime.toString(),
                end: endDate.toString(),
                list: list
            };
        } else if (startTime === null && endTime !== null) {
            newEvent = {
                title: text,
                start: startDate.toString(),
                end: endDate.toString() + "T" + endTime.toString(),
                list: list
            };
        } else {
            newEvent = {
                title: text,
                start: startDate.toString() + "T" + startTime.toString(),
                end: endDate.toString() + "T" + endTime.toString(),
                list: list
            };
        }

        calendarAPI.addEvent(newEvent);
        await createEvents(newEvent);

        console.log("EVENT LIST: ");
        console.log(eventList);
        console.log(list)
    }

    const handleEditEvent = (text, startTime, endTime, startDate, endDate) => {
        // TODO: Add error handling when start or end time are undefined
        if (event) {
            let formattedStart = startDate.toString() + "T" + startTime.toString();
            let formattedEnd = endDate.toString() + "T" + endTime.toString();
            event.setProp('title', text);
            event.setStart(formattedStart);
            event.setEnd(formattedEnd);
            editEvents(event, eventID, listID);


            console.log("EVENT LIST: ");
            console.log(eventList);
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

    if (loading) {
        return <CircularProgress />
    }

    return (
        <>
            <header className="CalendarTitle">
                <h1 className="TitleText">
                    <IconButton aria-label="menu" onClick={() => toggleDrawer(true)}>
                        <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                    TeamCalendar  <CalendarMonthIcon />
                </h1>
                <div className="UserText">Welcome, User!</div>
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
                    {openAddEvent && (
                        <EventPopupComponent
                            selectedUserID={selectedUserID}
                            open={openAddEvent}
                            setOpen={setOpenAddEvent}
                            clickedDate={clickedDate}
                            sendEventData={handleAddEvent}
                        />
                    )}
                    {openEditEvent && (
                        <EventEditComponent
                            selectedUserID={selectedUserID}
                            open={openEditEvent}
                            setOpen={setOpenEditEvent}
                            sendEventData={handleEditEvent}
                            requestDelete={handleDeleteEvent}
                            event={event}
                            listID={listID}
                        />
                    )}
                </div>
                {openDrawer && (
                    <Drawer open={openDrawer} onClose={() => toggleDrawer(false)}>
                        <MenuSidebarComponent
                            selectedUserID={selectedUserID}
                        />
                    </Drawer>
                )}
            </body>
            <footer className="CalendarFooter">
                © 2024 ProgExTRAORDINAIRE
            </footer>
        </>
    );
};

export default CalendarComponent;
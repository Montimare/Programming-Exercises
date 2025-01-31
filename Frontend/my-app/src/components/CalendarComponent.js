import './CalendarComponent.css'
import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAddComponent from "./EventAddComponent";
import EventEditComponent from './EventEditComponent';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer"
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button"
import MenuSidebarComponent from './MenuSidebarComponent';
import { useLocation, useParams } from "react-router-dom";
import { createEvents, deleteEvents, editEvents, fetchEventsByUser, fetchOwnedEventListsByUser, fetchNotificationsByUser, fetchEventListsInGroupsByUser, deleteNotifications } from "../Services/WebService";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider } from '@mui/material';

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

const CalendarComponent = () => {
    const calendarRef = useRef(null);

    // User data fetched from the user selection
    const [selectedUserID, setSelectedUserID] = useState(useParams().id);
    const location = useLocation();
    const username = location.state?.username || "";

    // All events fetched from Django's API
    const [allUserEvents, setAllUserEvents] = useState([]);
    const [groupEventLists, setGroupEventLists] = useState();
    const [ownedEventLists, setOwnedEventLists] = useState();

    // Event-related resources
    const [event, setEvent] = useState([]);
    const [listID, setListID] = useState();

    // Default for start and end date when clicking on an empty grid
    const [clickedDate, setClickedDate] = useState(false);

    // Rendering
    const [eventsChangeTracker, setEventsChangeTracker] = useState(0);
    const [ownedEventListChangeTracker, setOwnedEventListChangeTracker] = useState(0);
    const [groupEventListChangeTracker, setGroupEventListChangeTracker] = useState(0);
    const [loading, setLoading] = useState(true);
    const [openAddEvent, setOpenAddEvent] = useState(false);
    const [openEditEvent, setOpenEditEvent] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    // Notification data
    const [notificationData, setNotificationData] = useState();
    const [notificationDisplay, setNotificationDisplay] = useState();
    const [isNotificationDataOpen, setIsNotificationDataOpen] = useState(false);

    useEffect(() => { }, [event]);

    useEffect(() => {
        // Define an async function inside useEffect
        const getUserEvents = async () => {
            try {
                const userEventData = await fetchEventsByUser(selectedUserID)
                    .then(userEventData => {
                        setAllUserEvents(userEventData.data); // Update state with fetched user events
                        setLoading(false);
                    }); // Assuming fetchEventsByUser returns a promise
            } catch (error) {
                console.error("Failed to fetch events for this user:", error);
            }
        };

        getUserEvents(); // Call the async function
    }, [eventsChangeTracker]); // This effect runs every time the tracker is updated

    useEffect(() => {
        // Define an async function inside useEffect
        const getUserEventLists = async () => {
            try {
                const eventListData = await fetchOwnedEventListsByUser(selectedUserID)
                    .then(groupListData => {
                        setGroupEventLists(groupListData.data); // Update state with fetched user events
                        setLoading(false);
                    }); // Assuming fetchEventsByUser returns a promise
            } catch (error) {
                console.error("Failed to fetch events for this user:", error);
            }
        };

        getUserEventLists(); // Call the async function
    }, [ownedEventListChangeTracker]); // Empty dependency array means this effect runs only once

    useEffect(() => {
        // Define an async function inside useEffect
        const getGroupEventLists = async () => {
            try {
                const eventListData = await fetchEventListsInGroupsByUser(selectedUserID)
                    .then(eventListData => {
                        setOwnedEventLists(eventListData.data); // Update state with fetched user events
                        setLoading(false);
                    }); // Assuming fetchEventsByUser returns a promise
            } catch (error) {
                console.error("Failed to fetch events for this user:", error);
            }
        };

        getGroupEventLists(); // Call the async function
    }, [groupEventListChangeTracker]); // Empty dependency array means this effect runs only once

    const updateEvents = () => {
        setEventsChangeTracker(prev => prev + 1);
    }

    const updateOwnedEventLists = () => {
        setOwnedEventListChangeTracker(prev => prev + 1);
    }

    const updateGroupEventLists = () => {
        setGroupEventListChangeTracker(prev => prev + 1);
    }

    useEffect(() => { // Fetch notifications.

        const notificationFetcher = async () => {
            try {
                const notificationDataRaw = await fetchNotificationsByUser(selectedUserID)
                setNotificationData(notificationDataRaw.data);
            } catch (error) {
                console.log("Failed to fetch notifications:", error);
            }
        };

        notificationFetcher();
        const fetchInterval = setInterval(notificationFetcher, 600000); // do every 10 minutes

        return () => clearInterval(fetchInterval); // prevent memory leaks
    }, []);

    useEffect(() => { // Display notifications.
        if (!notificationData) return;
        console.log(notificationData);

        const notificationLogic = async () => {
            const currentTime = new Date();
            currentTime.setTime(currentTime.getTime() + currentTime.getTimezoneOffset() * 60 * 1000); // Adjust for timezone offset
            const berlinOffset = 2 * 60 * 60 * 1000; // CEST (Central European Summer Time) UTC +2 hours
            const currentTimeInBerlin = new Date(currentTime.getTime() + berlinOffset);


            notificationData.forEach(notification => {
                const notificationTime = new Date(notification.time); // Assuming 'notification.time' is in a standard format
                notificationTime.setTime(notificationTime.getTime()); // Adjust for timezone offset
                const notificationTimeInBerlin = new Date(notificationTime.getTime());

                // console.log(notificationTimeInBerlin);
                // console.log(currentTimeInBerlin);
                if (notificationTimeInBerlin <= currentTimeInBerlin) {
                    setNotificationDisplay(notification.event);
                    setIsNotificationDataOpen(true);
                    // console.log("Notification displayed");
                    deleteNotifications(notification.id);
                }
            });
        };

        notificationLogic();
        const notificationInterval = setInterval(notificationLogic, 60000); // do every minute

        return () => clearInterval(notificationInterval); // prevent memory leaks
    }, [notificationData]);

    const handleDateClick = (info) => {
        setClickedDate(info.date);
        updateGroupEventLists();
        setOpenAddEvent(true);
    }

    const handleEventClick = (info) => {
        info.event.setEnd(info.event.end === null ? info.event.start : info.event.end);
        // Finds corresponding event in Django API's database to get list ID
        let foundDjangoEvent = allUserEvents.find(djangoEvent => djangoEvent.id == info.event.id);
        if (foundDjangoEvent) {
            setEvent(info.event);
            setListID(foundDjangoEvent.list);
            updateGroupEventLists();
            setOpenEditEvent(true);
        } else {
            console.error("Event not found");
        }
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

        await createEvents(newEvent);
        calendarAPI.addEvent(newEvent);
        updateEvents();

        console.log("EVENT LIST: ");
        console.log(allUserEvents);

        console.log("FULLCALENDAR EVENT LIST:");
        console.log(calendarAPI.getEvents());
    }

    const handleEditEvent = (text, startTime, endTime, startDate, endDate, selectedListID) => {
        if (event) {
            let formattedStart = startDate.toString() + "T" + startTime.toString();
            let formattedEnd = endDate.toString() + "T" + endTime.toString();
            event.setProp('title', text);
            event.setStart(formattedStart);
            event.setEnd(formattedEnd);
            editEvents(event, event.id, selectedListID);
            updateEvents();

            console.log("EVENT LIST: ");
            console.log(allUserEvents);
        } else {
            alert("Event not found!");
        }
    }

    const handleEventDrop = (info) => {
        info.event.setEnd(info.event.end === null ? info.event.start : info.event.end);
        let foundDjangoEvent = allUserEvents.find(djangoEvent => djangoEvent.id == info.event.id);
        if (foundDjangoEvent) {
            editEvents(info.event, info.event.id, foundDjangoEvent.list);
            updateEvents();
        } else {
            console.error("Event not found");
        }
    }

    const handleDeleteEvent = () => {
        if (event) {
            event.remove();
            deleteEvents(event.id);
            updateEvents();
        } else {
            alert("Event not found!");
        }
    }

    const toggleDrawer = (newOpen) => {
        setOpenDrawer(newOpen);
    }

    if (loading) {
        return (
            <div className="LoadingContainer">
                <CircularProgress />
            </div>
        );
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
                <div className="UserText">Welcome, {username}!</div>
            </header>
            <div className="CalendarBody">
                <div className="CalendarOverview">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        aspectRatio={2}
                        firstDay={1}
                        dayMaxEventRows={true}
                        editable={true}
                        selectable={true}
                        events={allUserEvents}
                        ref={calendarRef}
                        eventClick={handleEventClick}
                        eventDrop={handleEventDrop}
                        dateClick={handleDateClick}
                    />
                    {openAddEvent && (
                        <EventAddComponent
                            selectedUserID={selectedUserID}
                            groupEventLists={groupEventLists}
                            open={openAddEvent}
                            setOpen={setOpenAddEvent}
                            clickedDate={clickedDate}
                            sendEventData={handleAddEvent}
                        />
                    )}
                    {openEditEvent && (
                        <EventEditComponent
                            selectedUserID={selectedUserID}
                            groupEventLists={groupEventLists}
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
                            sendUpdateListRequest={updateOwnedEventLists}
                            requestUpdateGroupLists={updateGroupEventLists}
                            requestUpdateEvents={updateEvents}
                        />
                    </Drawer>
                )}

                <Dialog open={isNotificationDataOpen}> {/* Notification Dialog */}
                    <DialogTitle>
                        Notification
                    </DialogTitle>
                    <Divider/>
                    <DialogContent>
                        {notificationDisplay + " is starting now!"}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsNotificationDataOpen(false)}>Close</Button>
                    </DialogActions>
                </Dialog>

            </div>
            <footer className="CalendarFooter">
                <b>© 2024 ProgExTRAORDINAIRE</b><br/>
                Marc Roemer, Klejdi Galushi, Felix Schneider<br/><br/>
                <b>Student project for Programming Exercises - Sabba</b>
            </footer>
        </>
    );
};

export default CalendarComponent;

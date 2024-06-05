import './CalendarComponent.css'
import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

/*
    CalendarComponent
    Created by Klejdi Galushi using React.js
    =========================================================================
    USEFUL LINKS
    =========================================================================
    Event Display - https://fullcalendar.io/docs/event-display
    Awesome React - https://github.com/enaqx/awesome-react?tab=readme-ov-file
    React Summary - https://www.youtube.com/watch?v=Tn6-PIqc4UM
*/

const CalendarComponent = () => {
    return (
        <>
            <header className="CalendarTitle">
                <h1>Team Calendar</h1>
            </header>
            <body>
                <div className="CalendarOverview">
                    <FullCalendar
                        plugins={[dayGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        aspectRatio={2}
                        firstDay={1}
                        dayMaxEventRows={true}
                        editable={true}
                        selectable={true}
                        events={[
                            {
                                title: 'Learning Session',
                                start: '2024-05-08',
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
                            },
                        ]}

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
                    />
                </div>
            </body>
            <footer className="CalendarFooter">
                Created by Prog.EXTRAORDINAIRE ©
            </footer>
        </>
    );
};

export default CalendarComponent;
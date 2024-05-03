import './CalendarComponent.css'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

/*
https://fullcalendar.io/docs/event-display -> Eve
*/

const CalendarComponent  = ()=>{
    return(
        <>
            <header className="CalendarTitle">
                <h1>Team Calendar</h1>
            </header>
            <body>
                <div className="CalendarOverview">
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                    />
                </div>
            </body>
            <footer className="CalendarFooter">
                Made by Prog.EXTRAORDINAIRE ©
            </footer>
        </>
    );
};

export default CalendarComponent;
import './CalendarComponent.css'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
/*
https://fullcalendar.io/docs/event-display -> Event Display
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
                        plugins = {[dayGridPlugin, interactionPlugin]}
                        initialView = "dayGridMonth"
                        aspectRatio={2}
                        firstDay={1}
                        events={[
                            {
                              title  : 'Learning Session',
                              start  : '2024-05-08'
                            },
                            {
                              title  : 'Thing I Need To Do',
                              start  : '2024-05-09',
                              end    : '2024-05-10'
                            },
                            {
                              title  : 'Hello',
                              start  : '2024-05-11T12:30:00',
                              allDay : false // will make the time show
                            }
                        ]}

                        eventClick={function(info) {
                        alert('Event: ' + info.event.title);
                        alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
                        alert('View: ' + info.view.type);
                    
                        // change the border color just for fun
                        info.el.style.borderColor = 'red';
                        }}
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
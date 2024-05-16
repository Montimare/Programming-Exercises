import logo from './logo.svg';
import './App.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const App = ()=>{
    return (
        <div className="App">
            <div style={{color: "red", width: "70vw", marginLeft: "15vw"}}> {/* pls no inline, stylesheets sind viel performanter */}
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                />    
            </div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
};

export default App;

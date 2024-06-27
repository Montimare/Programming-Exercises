import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserSelectionComponent from './components/UserSelectionComponent';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<UserSelectionComponent/>}/>
                </Routes>
                <Routes>
                    <Route path="/" element={<UserSelectionComponent/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;

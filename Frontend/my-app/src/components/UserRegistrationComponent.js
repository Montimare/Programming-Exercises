import { Button, Divider, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import "./UserRegistrationComponent.css"

const UserRegistrationComponent = () => {
    return (
        <div className="MainContainer">
            <div className="RegistrationBox">
                <h1 className="RegistrationTitle">Register</h1>
                <Divider />
                <div className="TextFieldListContainer">
                    <div className="TextFieldContainer">
                        <TextField label="Insert username here..." />
                    </div>
                    <div className="TextFieldContainer">
                        <TextField label="Insert e-mail address here..." />
                    </div>
                </div>
                <div className="ButtonContainer">
                    <Link to={"/calendar"}>
                        <Button variant="contained">Confirm</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserRegistrationComponent;
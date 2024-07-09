import { Button, Dialog, DialogContent, DialogTitle, DialogActions, Divider, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUsers } from "../Services/WebService";
import "./UserRegistrationComponent.css"
import { useState } from "react";

const UserRegistrationComponent = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [dialogVisiblity, setDialogVisiblity] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setDialogVisiblity(false);
    };

    const handleConfirmRegistration = async () => {
        try {
            let tmp = await createUsers(username, email);
            console.log(tmp);
            if (tmp) {
                setDialogVisiblity(true);
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Error during user registration:", error);
            // Handle the error appropriately (e.g., show an error message to the user)
        }
    };

    return (
        <div className="MainContainer">
            <div className="RegistrationBox">
                <h1 className="RegistrationTitle">Register</h1>
                {dialogVisiblity && (
                    <Dialog open={dialogVisiblity} onClose={handleClose}>
                        <DialogTitle>
                            Email already exists
                        </DialogTitle>
                        <DialogContent>
                            The email you are trying to write already exists.
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>OK</Button>
                        </DialogActions>
                    </Dialog>
                )}
                <Divider />
                <div className="TextFieldListContainer">
                    <div className="TextFieldContainer">
                        <TextField
                            label="Insert username here..."
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="TextFieldContainer">
                        <TextField
                            label="Insert e-mail address here..."
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                </div>
                <div className="ButtonContainer">
                    <Button variant="contained" onClick={handleConfirmRegistration}>Confirm</Button>
                </div>
            </div>
        </div>
    );
}

export default UserRegistrationComponent;
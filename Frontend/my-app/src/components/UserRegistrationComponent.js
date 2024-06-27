import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const UserSelectionComponent = () => {
    return (
        <>
            <h>Register</h>
            <Link to={"/calendar"}>
                <Button>Confirm</Button>
            </Link>
        </>
    );
}

export default UserSelectionComponent;
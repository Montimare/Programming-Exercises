import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const UserSelectionComponent = () => {
    return (
        <>
            <h>User Selection</h>
            <Link to={"/calendar"}>
                <Button>Select</Button>
            </Link>
        </>
    );
}

export default UserSelectionComponent;
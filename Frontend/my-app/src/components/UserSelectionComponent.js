import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const UserSelectionComponent = () => {
    return (
        <>
            <header>User Selection</header>
            <Link to={"/calendar"}>
                <Button>Select</Button>
            </Link>
        </>
    );
}

export default UserSelectionComponent;
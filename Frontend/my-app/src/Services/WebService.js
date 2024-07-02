import axios from "axios";

// GET functions
export const fetchUsers = async () => {
    return await axios.get("http://127.0.0.1:8000/users/");
};

export const fetchEvents = async () => {
    return await axios.get("http://127.0.0.1:8000/events/");
};

export const fetchEventsByUser = async (userID) => {
    return await axios.get("http://localhost:8000/users/" + userID + "/events/");
};

export const fetchEventListsByUser = async (userID) => {
    return await axios.get("http://localhost:8000/users/" + userID + "/eventlists/");
};

export const fetchNotificationsByUser = async (userID) => {
    return await axios.get("http://localhost:8000/users/" + userID + "/notifications/");
};

// POST Functions
// TODO: Check how to implement POST functions in Axios
export const createUsers = async (username, email) => {
    //marc ist sich nicht mehr sicher wie genau das geht, aber wenn moeglich wollen wir die daten im body senden.
    console.log("username:" + username);
    console.log("email: " + email);

    try {
        await axios.post(
            "http://127.0.0.1:8000/users/",
            {
                name: username,
                email: email
            }
        );
        // Return the response data or a success message to be displayed to the user
        return 0; // or return "User created successfully!";
    } catch (error) {
        console.error("An error occurred:", error);
        // Return an error message to be displayed to the user
        return 1;
    }

    // return await axios.post(
    //     "http://127.0.0.1:8000/users/",
    //     {
    //         name: username,
    //         email: email
    //     }
    //     return "1"
    // )
    // .catch(
    //     return "Error";
    // )
};
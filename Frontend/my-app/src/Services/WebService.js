import axios from "axios";

/*
    PUT in Axios: https://yourblogcoach.com/axios-put-request-in-react/
*/

// GET functions
export const fetchUsers = async () => {
    return await axios.get("http://montilab.duckdns.org:8000/users/");
};

export const fetchEvents = async () => {
    return await axios.get("http://montilab.duckdns.org:8000/events/");
};

export const fetchEventsByUser = async (userID) => {
    return await axios.get("http://montilab.duckdns.org:8000/users/" + userID + "/events/");
};

export const fetchEventListsByUser = async (userID) => {
    return await axios.get("http://montilab.duckdns.org:8000/users/" + userID + "/eventlists/");
};

export const fetchNotificationsByUser = async (userID) => {
    return await axios.get("http://montilab.duckdns.org:8000/users/" + userID + "/notifications/");
};

export const fetchGroupsByUser = async (userID) => {
    return await axios.get("http://montilab.duckdns.org:8000/users/" + userID + "/groups/");
}

// POST Functions
export const createUsers = async (username, email) => {
    console.log("Sending web request for user");
    console.log("username:" + username);
    console.log("email: " + email);

    try {
        await axios.post(
            "http://montilab.duckdns.org:8000/users/",
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
};

export const createEvents = async (event) => {
    console.log("Sending web request for event");
    console.log("title: " + event.title);
    console.log("start: " + event.start);
    console.log("end: " + event.end);
    console.log("list: " + event.list);

    try {
        await axios.post(
            "http://montilab.duckdns.org:8000/events/",
            {
                title: event.title,
                start: event.start,
                end: event.end,
                list: event.list
            }
        );
        // Return the response data or a success message to be displayed to the user
        return 0; // or return "User created successfully!";
    } catch (error) {
        console.error("An error occurred:", error);
        // Return an error message to be displayed to the user
        return 1;
    }
};

// PUT Functions
export const editEvents = async (event, eventID, list) => {
    try {
        console.log(event.title);
        console.log(event.start);
        console.log(event.end);
        console.log(event.list);
        await axios.put(
            "http://montilab.duckdns.org:8000/events/" + eventID + "/",
            {
                id: eventID,
                title: event.title,
                start: event.start,
                end: event.end,
                list: list
            }
        );
    } catch (error) {
        console.error("An error occurred:", error.response);
    }
};
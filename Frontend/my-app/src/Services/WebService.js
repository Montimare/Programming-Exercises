import axios from "axios";

/*
    PUT in Axios: https://yourblogcoach.com/axios-put-request-in-react/
    More API requests in Axios: https://www.freecodecamp.org/news/axios-react-how-to-make-get-post-and-delete-api-requests/

    TODO: Check if all web requests are correctly written
*/

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

export const fetchGroupsByUser = async (userID) => {
    return await axios.get("http://localhost:8000/users/" + userID + "/groups/");
}

// POST Functions
export const createUsers = async (username, email) => {
    console.log("Sending web request for user");
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
};

export const createEvents = async (event) => {
    console.log("Sending web request for event");
    console.log("title: " + event.title);
    console.log("start: " + event.start);
    console.log("end: " + event.end);
    console.log("list: " + event.list);

    try {
        await axios.post(
            "http://127.0.0.1:8000/events/",
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

export const createGroups = async (group) => {
    console.log("Sending web request for creating group");
    console.log("name: " + group.name);
    console.log("admin: " + group.admin);

    try {
        await axios.post(
            "http://127.0.0.1:8000/groups/",
            {
                name: group.name,
                admin: group.admin
            }
        );
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

export const createEventLists = async (eventList) => {
    console.log("Sending web request for creating event list");
    console.log("name: " + eventList.name);
    console.log("admin: " + eventList.admin);
    console.log("event_lists: " + eventList.groups);

    try {
        await axios.post(
            "http://127.0.0.1:8000/eventlists/",
            {
                name: eventList.name,
                admin: eventList.admin,
                groups: eventList.groups
            }
        );
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

export const createGroupMembers = async (userID, groupID) => {
    console.log("Sending web request for creating group member");
    console.log("user: " + userID);
    console.log("group: " + groupID);

    try {
        await axios.post(
            "http://127.0.0.1:8000/user_groups/",
            {
                user: userID,
                group: groupID
            }
        );
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

export const createGroupLists = async (groupID, listID) => {
    console.log("Sending web request for creating group lists");
    console.log("group: " + groupID);
    console.log("list: " + listID);

    try {
        await axios.post(
            "http://127.0.0.1:8000/user_groups/",
            {
                group: groupID,
                event_list: listID
            }
        );
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// PUT Functions
export const editEvents = async (event, eventID, list) => {
    try {
        console.log("Sending web request for editing event");
        console.log(event.title);
        console.log(event.start);
        console.log(event.end);
        console.log(event.list);
        await axios.put(
            "http://127.0.0.1:8000/events/" + eventID + "/",
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

export const editGroups = async (group) => {
    try {
        console.log("Sending web request for editing group");
        console.log(group.name);
        console.log(group.admin);
        console.log(group.event_lists);
        console.log(group.users);
        await axios.put(
            "http://127.0.0.1:8000/groups/" + group.id + "/",
            {
                id: group.id,
                name: group.name,
                admin: group.admin,
                event_lists: group.event_lists,
                users: group.users
            }
        );
    } catch (error) {
        console.error("An error occurred:", error.response);
    }
};

export const editEventLists = async (eventList) => {
    try {
        console.log("Sending web request for editing event list");
        console.log(eventList.name);
        console.log(eventList.admin);
        console.log(eventList.groups);
        await axios.put(
            "http://127.0.0.1:8000/eventlists/" + eventList.id + "/",
            {
                id: eventList.id,
                name: eventList.name,
                admin: eventList.admin,
                groups: eventList.groups
            }
        );
    } catch (error) {
        console.error("An error occurred:", error.response);
    }
};

// DELETE Functions
export const deleteEvents = async (eventID) => {
    console.log("Sending web request for deleting event");
    try {
        await axios.delete("http://127.0.0.1:8000/events/" + eventID + "/");
    } catch (error) {
        console.error("An error occurred:", error.response);
    }
}

export const deleteGroups = async (groupID) => {
    console.log("Sending web request for deleting group");
    try {
        await axios.delete("http://127.0.0.1:8000/groups/" + groupID + "/");
    } catch (error) {
        console.error("An error occurred:", error.response);
    }
}

export const deleteEventLists = async (eventListID) => {
    console.log("Sending web request for deleting event list");
    try {
        await axios.delete("http://127.0.0.1:8000/eventlists/" + eventListID + "/");
    } catch (error) {
        console.error("An error occurred:", error.response);
    }
}
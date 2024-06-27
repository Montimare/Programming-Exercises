import axios from "axios";

export const fetchUsers = async () => {
    return await axios.get("http://127.0.0.1:8000/users/");
};

export const createUsers = async (content) => {
    //marc ist sich nicht mehr sicher wie genau das geht, aber wenn moeglich wollen wir die daten im body senden.
    return await axios.post("http://127.0.0.1:8000/users/");
};

export const fetchEvents = async () => {
    return await axios.get("http://127.0.0.1:8000/events/");
};
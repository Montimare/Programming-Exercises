import axios from "axios";

const fetchUsers = () => {
    const axios = require('axios');

    return axios.get("http://127.0.0.1:8000/users/");
}

export default fetchUsers;
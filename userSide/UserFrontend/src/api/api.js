
import axios from "axios";

const API = axios.create({
    baseURL: "https://smart-contact-book.onrender.com/api", // deployed URL
});

export default API;

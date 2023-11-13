import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://137.184.132.84:8010/",
});

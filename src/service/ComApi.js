import axios, { Axios } from "axios"

const axios = new Axios()
axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});
axios.onError

export default {
    post : (url , data ) => {
        return axios.post(url, data)
    }
};

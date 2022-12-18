import axios from "axios"

import authHeader from "./AuthHeader";

class UserService {

    axiosUserInstance = axios.create({
        headers: {"Access-Control-Allow-Origin": "*"},
        baseURL: process.env.REACT_APP_URL_API_V1_USERS
    });

    getAllUsers = () => {
        return this.axiosUserInstance.get("", { headers: authHeader() })
    }

    getUserByUid = (uid) => {
        return this.axiosUserInstance.get("/" + uid, { headers: authHeader() })
    }

    getUserByUsername = (username) => {
        return this.axiosUserInstance.get("/username/" + username, { headers: authHeader() })
    }

    deleteUser = (uid) => {
        return this.axiosUserInstance.delete("delete/" + uid, { headers: authHeader() })
    }

}

export default new UserService()
import axios from "axios"

import authHeader from "./AuthHeader";

class UserService {

    axiosUserInstance = axios.create({
        headers: {"Access-Control-Allow-Origin": "*"},
        baseURL: process.env.REACT_APP_URL_API_V1_USERS
    });

    getAllUsers = async () => {
        return await this.axiosUserInstance.get("", { headers: authHeader() })
    }

    getUserByUid = async (uid) => {
        return await this.axiosUserInstance.get("/" + uid, { headers: authHeader() })
    }

    getUserByUsername = async (username) => {
        return await this.axiosUserInstance.get("/username/" + username, { headers: authHeader() })
    }

    deleteUser = async (uid) => {
        return await this.axiosUserInstance.delete("delete/" + uid, { headers: authHeader() })
    }

}

export default new UserService()
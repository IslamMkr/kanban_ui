import axios from "axios"

import authHeader from "./AuthHeader";

class KanbanService {

    axiosInstance = axios.create({
        headers: {"Access-Control-Allow-Origin": "*"},
        baseURL: process.env.REACT_APP_URL_API_V1_KANBANS
    });

    getAllKanbans = async () => {
        return await this.axiosInstance.get("", { headers: authHeader() })
    }

    getKanbanByKid = async (kid) => {
        return await this.axiosInstance.get(kid, { headers: authHeader() })
    }

    saveKanban = async (kanban) => {
        return await this.axiosInstance.post("save", kanban, { headers: authHeader() })
    }

    getUserKanbans = async (uid) => {
        return await this.axiosInstance.get("/user/" + uid, { headers: authHeader() })
    }

    getPublicKanbans = async () => {
        return await this.axiosInstance.get("public", { headers: authHeader() })
    }

    addMemberToKanban = async (kid, username) => {
        return await this.axiosInstance.put(kid + "/addmember/" + username, { headers: authHeader() })
    }

    getKanbanMembers = async (kid) => {
        return await this.axiosInstance.get(kid + "/members", { headers: authHeader() })
    }

    deleteKanban = async (kid) => {
        return await this.axiosInstance.delete("delete/" + kid, { headers: authHeader() })
    }

}

export default new KanbanService()
import axios from "axios"

import authHeader from "./AuthHeader";

class KanbanService {

    axiosInstance = axios.create({
        headers: {"Access-Control-Allow-Origin": "*"},
        baseURL: process.env.REACT_APP_URL_API_V1_KANBANS
    });

    getAllKanbans = () => {
        return this.axiosInstance.get("", { headers: authHeader() })
    }

    getKanbanByKid = (kid) => {
        return this.axiosInstance.get(kid, { headers: authHeader() })
    }

    saveKanban = (kanban) => {
        return this.axiosInstance.post("save", kanban, { headers: authHeader() })
    }

    getUserKanbans = (uid) => {
        return this.axiosInstance.get("/user/" + uid, { headers: authHeader() })
    }

    getPublicKanbans = () => {
        return this.axiosInstance.get("public", { headers: authHeader() })
    }

    addMemberToKanban = (kid, uid) => {
        return this.axiosInstance.post(kid + "/addmember/" + uid, { headers: authHeader() })
    }

    getKanbanMembers = (kid) => {
        return this.axiosInstance.get(kid + "/members", { headers: authHeader() })
    }

    deleteKanban = (kid) => {
        return this.axiosInstance.delete("delete/" + kid, { headers: authHeader() })
    }

}

export default new KanbanService()
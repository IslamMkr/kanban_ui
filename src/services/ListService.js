import axios from "axios"

import authHeader from "./AuthHeader";

class ListService {

    axiosInstance = axios.create({
        headers: {"Access-Control-Allow-Origin": "*"},
        baseURL: process.env.REACT_APP_URL_API_V1_LISTS
    });

    getListById = (lid) => {
        return this.axiosInstance.get(lid, authHeader)
    }

    getKanbanLists = (kid) => {
        return this.axiosInstance.get("kanban/" + kid, authHeader)
    }

    saveList = (list) => {
        return this.axiosInstance.post("save", list, authHeader)
    }

    deleteList = (lid) => {
        return this.axiosInstance.delete("delete/" + lid, authHeader)
    }

}

export default new ListService()
import axios from "axios"

import authHeader from "./AuthHeader";

class ListService {

    axiosInstance = axios.create({
        headers: {"Access-Control-Allow-Origin": "*"},
        baseURL: process.env.REACT_APP_URL_API_V1_LISTS
    });

    getListById = async (lid) => {
        return await this.axiosInstance.get(lid, authHeader)
    }

    getKanbanLists = async (kid) => {
        return await this.axiosInstance.get("kanban/" + kid, authHeader)
    }

    saveList = async (list) => {
        return await this.axiosInstance.post("save", list, authHeader)
    }

    deleteList = async (lid) => {
        return await this.axiosInstance.delete("delete/" + lid, authHeader)
    }

}

export default new ListService()
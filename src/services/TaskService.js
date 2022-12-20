import axios from "axios"

import authHeader from "./AuthHeader";

class TaskService {

    axiosInstance = axios.create({
        headers: {"Access-Control-Allow-Origin": "*"},
        baseURL: process.env.REACT_APP_URL_API_V1_TASKS
    });
    
    saveTask = (task) => {
        return this.axiosInstance.post("save", task, authHeader)
    }

    getTaskById = (tid) => {
        return this.axiosInstance.get(tid, authHeader)
    }

    getListTasks = (lid) => {
        return this.axiosInstance.get("list/" + lid, authHeader)
    }

    getKanbanTasks = (kid) => {
        this.axiosInstance.get("kanban/" + kid, authHeader)
    }

    updateTaskList = (tid, lid) => {
        this.axiosInstance.put(tid + "/list/" + lid, authHeader)
    }

    deleteTask = (tid) => {
        return this.axiosInstance.delete("delete/" + tid, authHeader)
    }

}

export default new TaskService()
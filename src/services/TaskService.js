import axios from "axios"

import authHeader from "./AuthHeader";

class TaskService {

    axiosInstance = axios.create({
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        baseURL: process.env.REACT_APP_URL_API_V1_TASKS
    });
    
    saveTask = async (task) => {
        return await this.axiosInstance.post("save", task, authHeader)
    }

    getTaskById = async (tid) => {
        return await this.axiosInstance.get(tid, authHeader)
    }

    getListTasks = async (lid) => {
        return await this.axiosInstance.get("list/" + lid, authHeader)
    }

    getKanbanTasks = async (kid) => {
        return await this.axiosInstance.get("kanban/" + kid, authHeader)
    }

    updateTaskList = async (tid, lid) => {
        return await this.axiosInstance.put(tid + "/list/" + lid, authHeader)
    }
    
    deleteTask = async (tid) => {
        return await this.axiosInstance.delete("delete/" + tid, authHeader)
    }

    getUserTasks = async (uid) => {
        return await this.axiosInstance.get("user/" + uid, authHeader)
    }

}

export default new TaskService()
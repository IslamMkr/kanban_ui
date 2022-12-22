import axios from "axios";

import authHeader from "./AuthHeader";
class AuthService {

    axiosInstance = axios.create({
        headers: {"Access-Control-Allow-Origin": "*"},
        baseURL: 'http://localhost:8080/'
    });

    login = async (username, password) => {
        // Requires x-www-form-urlencoded data form
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)

        return await this.axiosInstance.post("/login", params)
            .then (res => {
                if (res.data.accessToken) {
                    localStorage.setItem("auth-data", JSON.stringify(res.data))
                }

                return res.data
            }).catch (err => {
                console.log("AuthService -> login -> failure : ", err)
            }) 
    }

    logout = () => {
        localStorage.removeItem('auth-data')
        localStorage.removeItem('user')
    }

    signin = async (user) => {
        return await this.axiosInstance.post("api/v1/users/save", user, { headers: authHeader() })
            .then (res => {
                return res
            })
            .catch (err => {
                console.log("AuthService -> signin -> failure : ", err)
            }) 
    }
    
    authData = () => {
        return JSON.parse(localStorage.getItem('auth-data')) 
    }
}

export default new AuthService();
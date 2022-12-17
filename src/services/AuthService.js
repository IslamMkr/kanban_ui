import axios from "axios";

class AuthService {

    axiosInstance = axios.create({
        headers: {"Access-Control-Allow-Origin": "*"},
        baseURL: "http://localhost:8080/"
    });
    login = (username, password) => {
        // Requires x-www-form-urlencoded data form
        const params = new URLSearchParams()
        params.append('username', username)
        params.append('password', password)

        return this.axiosInstance.post("login", params)
        .then (res => {
            if (res.data.accessToken) {
                localStorage.setItem("auth-data", JSON.stringify(res.data))
            }

            //console.log("auth service ok : ", res.data)

            return res.data
        }).catch (err => {
            //console.log("auth service bad : ", err)
            console.log(err)
        }) 
    }

    logout = () => {
        localStorage.removeItem('auth-data')
    }

    signin = (user) => {
        return this.axiosInstance.post("api/v1/users/save", user)
        .then (res => {
            return res
        })
        .catch (err => {
            console.log(err)
            return err
        }) 
    }
    
    authData = () => {
        //console.log(JSON.parse(localStorage.getItem('auth-data')))
        return JSON.parse(localStorage.getItem('auth-data')) 
    }
}

export default new AuthService();
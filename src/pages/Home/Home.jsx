import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import "./home.css"

import AuthService from '../../services/AuthService'
import UserService from "../../services/UserService"

import ProfilPic from "../../assets/icons/man.png"
import KanbanForm from '../../components/main/KanbanForm/KanbanForm'

const Home = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({})

    useEffect(() => {
        const authData = AuthService.authData()

        if (authData === null) {
            //console.log(authData)
            navigate("/", { replace: true })
        } else {
            UserService.getUserByUsername(authData.username)
                .then(res => {
                    setUser(res.data)
                    localStorage.setItem("user", JSON.stringify(res.data))
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <div className='container'>
            <div className="profil">
                <img src={ProfilPic} alt="" id="icon" />
                <div className="username">
                    <h3>{user.firstname} {user.lastname}</h3>
                    <p>{user.username}</p>
                </div>
            </div>

            <KanbanForm />
        </div>
    )
}

export default Home
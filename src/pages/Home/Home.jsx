import React, { useState, useEffect } from 'react'

import "./home.css"

import AuthService from '../../services/AuthService'
import UserService from "../../services/UserService"

import ProfilPic from "../../assets/icons/man.png"

const Home = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const authData = AuthService.authData()

        UserService.getUserByUsername(authData.username)
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })
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
        </div>
    )
}

export default Home
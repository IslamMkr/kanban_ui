import { Button, TextField } from '@mui/material/'
import React, { useState } from 'react'

import AuthService from '../../../services/AuthService'

import "./login.css"

const Login = ({ login }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(false)
    
    const connectionHandler = () => {
        setError(false)

        const goodUsername = username.trim() !== "" && !username.includes(' ')
        const goodPassword = password.trim() !== "" && password.length > 4
        
        if (!goodUsername || !goodPassword) {
            setError(true)

            return
        }

        if (username)
        AuthService.login(username, password)
            .then(res => {
                if (res === undefined) {
                    setError(true)
                } else {
                    setError(false)
                    login()
                }
            })
            .catch(err => {
                setError(true)
                console.log("Login -> connectionHandler -> failure : ", err)
            })
    }

    return (
        <div className='login'>
            <div className="login-field">
                <TextField 
                    className='textfield' 
                    label="Nom d'utilisateur" 
                    variant='outlined'
                    onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="login-field">
                <TextField 
                    className='textfield' 
                    label="Mot de passe" 
                    variant='outlined'
                    type="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            {
                error &&
                <div id="error">
                    <p>Nom d'utilisateur ou mot de passe incorrect !</p>
                </div>
            }

            <Button 
                    id='btn-create-account'
                    variant='outlined' 
                    color="primary" 
                    disableElevation
                    onClick={connectionHandler}>
                Connecter
            </Button>
        </div>
    )
}

export default Login
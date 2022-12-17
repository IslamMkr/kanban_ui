import { Button, TextField } from '@mui/material/'
import React, { useState } from 'react'

import AuthService from '../../../services/AuthService'

import "./login.css"

const Login = (/*{ authentification }*/) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("Nom d'utilisateur ou mot de passe incorrect!")

    const connectionHandler = () => {
        let authData = undefined

        AuthService.login(username, password)
            .then(res => {
                authData = res
            })
            .catch(err => {
                authData = err
            })

        console.log(authData)

        if (authData === undefined) {
            setError(true)
        } else {
            setError(false)
        }
        //authentification()
    }

    return (
        <div className='login'>
            <h2>Connexion</h2>
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
                    <p>{errorMsg}</p>
                </div>
            }

            <Button variant='outlined' 
                    color="primary" 
                    disableElevation
                    onClick={connectionHandler}>
                Connecter
            </Button>
        </div>
    )
}

export default Login
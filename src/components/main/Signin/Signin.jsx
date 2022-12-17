import React, { useState } from 'react'

import { 
    TextField, 
    Button 
} from '@mui/material'

import "./signin.css"

import AuthService from '../../../services/AuthService'

const Signin = () => {

    const [lastname, setLastName] = useState("")
    const [firstname, setFirstName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const resetFields = () => {
        setLastName("")
        setFirstName("")
        setUsername("")
        setEmail("")
        setPassword("")
        console.log("Here")
    }

    const accountCreationHandler = () => {
        const user = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password
        }

        console.log(user)

        AuthService.signin(user)
            .then(res => {
                if (res.data === "") {
                    setErrorMsg("Vos informations ne sont pas correctes!")
                    setError(true)
                } else {
                    setErrorMsg("Votre compte est créé.")
                    setError(true)
                    resetFields()
                }
            })
        
    }

    return (
        <div className='create-account'>
            <div className="create-account-field">
                <TextField 
                    className='textfield' 
                    label="Nom" 
                    variant='outlined'
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div className="create-account-field">
                <TextField 
                    className='textfield' 
                    label="Prénom" 
                    variant='outlined'
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)} />
            </div>
            
            <div className="create-account-field">
                <TextField 
                    className='textfield' 
                    label="Nom d'utilisateur" 
                    variant='outlined'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="create-account-field">
                <TextField 
                    className='textfield' 
                    label="E-mail" 
                    variant='outlined'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="create-account-field">
                <TextField 
                    className='textfield' 
                    label="Mot de passe" 
                    variant='outlined'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            {
                error &&
                <div id="error">
                    <p>{errorMsg}</p>
                </div>
            }
            
            <Button 
                    id="btn-create-account"
                    variant='outlined' 
                    color="primary" 
                    disableElevation
                    onClick={accountCreationHandler}>
                Créer un compte
            </Button>
        </div>
    )
}

export default Signin
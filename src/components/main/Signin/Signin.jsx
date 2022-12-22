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
    }

    const accountCreationHandler = () => {
        const goodFirstname = firstname.trim() !== ""
        const goodLastname = lastname.trim() !== ""
        const goodUsername = username.trim() !== "" && !username.includes(' ')
        const goodPassword = password.trim() !== "" && password.length > 4
        const goodEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

        if (!goodLastname) {
            setError(true)
            setErrorMsg("Nom incorrect!")

            return
        }

        if (!goodFirstname) {
            setError(true)
            setErrorMsg("Prénom incorrect!")

            return

        }
        
        if (!goodUsername) {
            setError(true)
            setErrorMsg("Nom d'utilisateur incorrect, doit etre sans espaces!")

            return
        }

        if (!goodEmail) {
            setError(true)
            setErrorMsg("Email incorrect!")

            return
        }

        if (!goodPassword) {
            setError(true)
            setErrorMsg("Mot de passe doit avoir au moins 4 caractères!")

            return
        }

        const user = {
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            password: password
        }

        AuthService.signin(user)
            .then(res => {
                if (res.data === "") {
                    setErrorMsg("Votre email et/ou nom d'utilisateur sont déja utilisés!")
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
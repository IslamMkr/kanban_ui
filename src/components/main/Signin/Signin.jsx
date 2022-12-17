import React, { useState } from 'react'

import { 
    TextField, 
    Button 
} from '@mui/material'

import "./signin.css"

const Signin = () => {

    const [lastname, setLastName] = useState("")
    const [firstname, setFirstName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const accountCreationHandler = () => {
        
    }

    return (
        <div className='create-account'>
            <h2>Créer un compte</h2>

            <div className="create-account-field">
                <TextField 
                    className='textfield' 
                    label="Nom" 
                    variant='outlined'
                    onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div className="create-account-field">
                <TextField 
                    className='textfield' 
                    label="Prénom" 
                    variant='outlined'
                    onChange={(e) => setFirstName(e.target.value)} />
            </div>
            
            <div className="create-account-field">
                <TextField 
                    className='textfield' 
                    label="Nom d'utilisateur" 
                    variant='outlined'
                    onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="create-account-field">
                <TextField 
                    className='textfield' 
                    label="E-mail" 
                    variant='outlined'
                    onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="create-account-field">
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
                    onClick={accountCreationHandler}>
                Créer un compte
            </Button>
        </div>
    )
}

export default Signin
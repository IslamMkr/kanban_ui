import React from 'react'

import Signin from '../../components/main/Signin/Signin'
import Login from '../../components/main/Login/Login'

import "./auth.css"

const Auth = () => {
    return (
        <div className='auth'>
            <div className='auth-header'>
                <h1>Kanban</h1>
                <h4>Gestionnaire de projets</h4>
            </div>
            
            <div className="auth-content">
                <Login />
                <hr />
                <Signin /> 
            </div>
        </div>
    )
}

export default Auth
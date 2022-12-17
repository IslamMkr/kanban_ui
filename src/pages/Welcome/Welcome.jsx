import React, { useState } from 'react'
import Login from '../../components/main/Login/Login'
import Signin from '../../components/main/Signin/Signin'

import './welcome.css'

import Image from '../../assets/svg/schedule.svg'

const Welcome = ({ login }) => {
    const [onLogin, setOnLogin] = useState(true)
    const [instructionText, setInstructionText] = useState("Créez un compte")
    const [instructionText2, setInstructionText2] = useState("Vous n'avez pas un compte ?")

    const handleLoggingAreaChange = () => {
        setOnLogin(!onLogin)

        if (!onLogin) {
            setInstructionText("Créez un compte")
            setInstructionText2("Vous n'avez pas un compte ?")
        } else {
            setInstructionText("Connectez à votre compte")
            setInstructionText2("Vous avez un compte ?")
        }
    }

    return (
        <div className='welcome'>
            <div className="presentation">
                <img src={Image} alt="" />

                <div className='text'>
                    <h2>Prenez le contrôle de votre travail.</h2>
                    <p>Nous vous aidons à organiser votre travail quotidien avec un moyen simple, efficace et facile de collaborer.</p>
                </div>
            </div>
            <div className="login-signin">
                <div className='login-signin-area'>
                    <h1>Bonjour !</h1>
                    <p>Connectez-vous pour bénéficier des fonctionnalités de notre platforme.</p>
                    {
                        onLogin ?
                        <Login login={() => login()} />
                        :
                        <Signin />
                    }
                </div>
                <div id="create-account">
                    <p>{instructionText2}</p>
                    <p id='btn-instruction'
                        onClick={handleLoggingAreaChange}><b>{instructionText}</b></p>
                </div>
            </div>
        </div>
    )
}

export default Welcome
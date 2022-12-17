import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from '../../components/main/Header/Header'
import Home from '../../components/main/Home/Home'
import Invited from '../../components/main/Invited/Invited'

import './container.css'

const Container = ({ authentification }) => {

    const handleLogout = () => {
        console.log("Container\t: handling logout")
        authentification()
    }

    return (
        <div className='container'>
            <Header logout={handleLogout} />
            
            <div className='container'>
                <Routes>
                    <Route exact path="/home" element={ <Home /> } />
                    <Route exact path="/invited" element={ <Invited /> } />
                </Routes>
            </div>
        </div>
    )
}

export default Container
import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import AuthService from '../../../services/AuthService'

import './header.css'

const Header = ({ logout }) => {

    const disconnect = () => {
        console.log("Header\t: handling logout")
        logout()
    }

    return (
        <div className='header'>
            <div>
                <h1>Kanban</h1>
            </div>

            <nav>
                <ul className='header-links'>
                    <li >
                        <Link to="/home">MES KANBANS</Link>
                    </li>
                    <li>
                        <Link to="/invited">KANBANS INVITES</Link>
                    </li>
                </ul>
            </nav>

            <Button
                id='logout-btn'
                variant='outlined'
                onClick={disconnect}>
                Déconncter
            </Button>
        </div>
    )
}

export default Header
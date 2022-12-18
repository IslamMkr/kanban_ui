import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import './header.css'

const Header = ({ isAuth, logout }) => {

    const disconnect = () => {
        logout()
    }

    return (
        <div className='header'>
            <div>
                <h1>Kanban</h1>
            </div>

            <nav>
                {
                    !isAuth &&
                    <ul className='header-links'>
                        <li >
                            <Link to="/">ACCUEIL</Link>
                        </li>
                        <li >
                            <Link to="/kanbans/">KANBANS</Link>
                        </li>
                    </ul>
                }
            </nav>

            {
                isAuth &&
                <Button
                    id='logout-btn'
                    variant='outlined'
                    onClick={disconnect}>
                    Déconncter
                </Button>
            }
        </div>
    )
}

export default Header
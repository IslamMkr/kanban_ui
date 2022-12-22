import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import KanbanService from '../../services/KanbanService'

import Project from "../../components/main/Project/Project"

import "./public-kanbans.css"

const PublicKanbans = () => {
    const navigate = useNavigate()

    const [kanbans, setKanbans] = useState([])

    useEffect(() => {
        KanbanService.getPublicKanbans()
            .then(res => {
                setKanbans(res.data)
            })
    }, [])

    const goToKanbanPage = (kanban) => {
        navigate("/public/kanban/" + kanban.kid, { 
            replace: true,
            state: {
                kanban: kanban,
                isOwner: false,
                isAuth: false
            }
        })
    }

    return (
        <div className="public-kanbans">
            <h1>Kanbans publics</h1>

            <div className="kanbans">
                {
                    kanbans.map(kanban => (
                        <Project 
                            key={kanban.kid} 
                            kanban={kanban} 
                            seeMore={(kanban, isAuth) => goToKanbanPage(kanban, isAuth)} />
                    ))
                }
            </div>
        </div>
    )
}

export default PublicKanbans
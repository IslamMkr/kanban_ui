import React, { useState, useEffect } from 'react'

import KanbanService from '../../services/KanbanService'

import Project from "../../components/main/Project/Project"

import "./public-kanbans.css"

const PublicKanbans = () => {
    const [kanbans, setKanbans] = useState([])

    useEffect(() => {
        KanbanService.getPublicKanbans()
            .then(res => {
                console.log("useEffect : ", res)
                setKanbans(res.data)
            })
    }, [])

    const handleClick = (kid) => {
        const index = kanbans.findIndex(kanban => kanban.kid === kid)
        console.log(kanbans[index])
        //TODO: Go to kanban infos page
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
                            clicked={() => handleClick(kanban.kid)} />
                    ))
                }
            </div>
        </div>
    )
}

export default PublicKanbans
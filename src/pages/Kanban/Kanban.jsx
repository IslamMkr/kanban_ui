import React, { useState, useEffect } from 'react'

import { useParams, useLocation } from 'react-router-dom'

import List from '../../components/main/List/List'
import KanbanService from "../../services/KanbanService"
import ListService from "../../services/ListService"

import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';

import './kanban.css'

const Kanban = () => {
    const { kid } = useParams()
    const location = useLocation()

    const [kanban, setKanban] = useState({})
    const [lists, setLists] = useState([])

    useEffect(() => {
        if (location.state.kanban === null &&
            location.state.kanban === undefined &&
            location.state.kanban === '') {

            fetchKanban()
        } else {
            setKanban(location.state.kanban)
        }

        //fetchKanban()
        fetchKanbanLists()
    }, [])

    const fetchKanban = () => {
        KanbanService.getKanbanByKid(kid)
            .then(res => {
                setKanban(res.data)
                //console.log(res.data)
            })
            .catch(err => {
                console.log("Kanban -> fetchKanban -> failure : ", err)
            })
    }

    const fetchKanbanLists = () => {
        ListService.getKanbanLists(kid)
            .then(res => {
                setLists(res.data)
            })
            .catch(err => {
                console.log("Kanban -> fetchKanbanLists -> failure : ", err)
            })
    }

    return (
        <div className='container'>
            <div className="kanban-header">
                <div className="kanban-infos">
                    <div className="kanban-title">
                        <ViewKanbanIcon className='icon'/>
                        <h2>{kanban.title}</h2>
                    </div>
                    <p id='description'>{kanban.description}</p>
                    {
                        kanban.owner !== undefined &&
                        <p id='creator'>Créé par <b>{kanban.owner.firstname} {kanban.owner.lastname}</b></p>
                    }
                </div>

                <div className="kanban-settings">
                    <PersonAddIcon  className='icon'/>
                    <SettingsIcon className='icon' />
                    <DeleteIcon className='icon icon-clear' />
                </div>
            </div>

            <div className='lists'>
                {
                    lists.map(list => (
                        <List key={list.lid} kanban={kanban} list={list} />
                    ))
                }
            </div>
        </div>
    )
}

export default Kanban
import React, { useState, useEffect } from 'react'

import { useParams, useLocation } from 'react-router-dom'

import List from '../../components/main/List/List'
import KanbanService from "../../services/KanbanService"
import ListService from "../../services/ListService"
import TaskService from '../../services/TaskService';

import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import SettingsIcon from '@mui/icons-material/Settings';

import './kanban.css'
import PopupMenu from '../../components/reusable/PopupMenu/PopupMenu'

const Kanban = () => {
    const { kid } = useParams()
    const location = useLocation()

    const [kanban, setKanban] = useState({})
    const [lists, setLists] = useState([])
    const [tasks, setTasks] = useState([])

    const [togglePopupMenu, setTogglePopupMenu] = useState(false)

    useEffect(() => {
        if (location.state.kanban === null &&
            location.state.kanban === undefined &&
            location.state.kanban === '') {

            fetchKanban()
        } else {
            setKanban(location.state.kanban)
        }

        fetchKanbanLists()
        fetchTasks()
    }, [])

    const fetchKanban = () => {
        KanbanService.getKanbanByKid(kid)
            .then(res => {
                setKanban(res.data)
            })
            .catch(err => {
                console.log("Kanban -> fetchKanban -> failure : ", err)
            })
    }

    const fetchTasks = () => {
        console.log(kid)
        TaskService.getKanbanTasks(kid)
            .then(res => {
                setTasks(res.data)
            })
            .catch(err => {
                console.log("List -> fetchTasks -> failure : ", err)
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

    const onMenuItemClicked = () => {
        setTogglePopupMenu(!togglePopupMenu)
    }

    const taskChangedList = () => {
        fetchTasks()
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
                
                <div className="menu">
                    <SettingsIcon 
                        className='icon'
                        onClick={() => setTogglePopupMenu(!togglePopupMenu)} />
                    
                    {
                        togglePopupMenu &&
                        <PopupMenu menuItems={[{option: "Inviter"}, {option: "Supprimer"}]} onItemClicked={(item) => onMenuItemClicked(item)} />
                    }
                </div>
            </div>

            <div className='lists'>
                {
                    lists.map(list => (
                        <List key={list.lid} kanban={kanban} list={list} tasks={tasks.filter(task => task.list.lid === list.lid)} lists={lists} notifyTaskListChanged={(task) => taskChangedList(task)} notifyDataChanged={() => fetchTasks()} />
                    ))
                }
            </div>
        </div>
    )
}

export default Kanban
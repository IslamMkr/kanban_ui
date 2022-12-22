import React, { useState, useEffect } from 'react'

import { useParams, useLocation, useNavigate } from 'react-router-dom'

import List from '../../components/main/List/List'
import KanbanService from "../../services/KanbanService"
import ListService from "../../services/ListService"
import TaskService from '../../services/TaskService';

import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './kanban.css'
import PopupMenu from '../../components/reusable/PopupMenu/PopupMenu'
import { Button, Dialog, TextField } from '@mui/material'

const Kanban = () => {
    const navigate = useNavigate()

    const { kid } = useParams()
    const location = useLocation()

    const [kanban, setKanban] = useState({})
    const [lists, setLists] = useState([])
    const [tasks, setTasks] = useState([])

    const [members, setMembers] = useState([])

    const [username, setUsername] = useState("")

    const [togglePopupMenu, setTogglePopupMenu] = useState(false)
    const [toggleInviteUser, setToggleInviteUser] = useState(false)

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

    const onMenuItemClicked = (item) => {
        setTogglePopupMenu(!togglePopupMenu)

        if (item === "Supprimer") {
            deleteKanban()
        } else if (item === "Inviter") {
            setToggleInviteUser(!toggleInviteUser)
        }
    }

    const deleteKanban = () => {
        KanbanService.deleteKanban(kid)
            .then(res => {
                if (res.data.type === "success") {
                    navigate("/home")
                } else {
                    console.error("Kanban -> onMenuItelmClicked -> Could not delete kanban", )
                }
            })
            .catch(err => {
                console.error("Kanban -> onMenuItelmClicked -> failure : ", err)
            })
    }

    const inviteUser = () => {
        setToggleInviteUser(!toggleInviteUser)

        KanbanService.addMemberToKanban(kid, username)
            .then(res => {
                fetchMembers()
            })
            .catch(err => {
                console.log("Kanban -> inviteUser -> failure : ", err)
            })
    }

    const fetchMembers = () => {
        KanbanService.getKanbanMembers(kid)
            .then(res => {
                setMembers(res.data)
            })
            .catch(err => {
                console.log("Kanban -> fetchMembers -> failure : ", err)
            })
    }

    const taskChangedList = () => {
        fetchTasks()
    }

    const returnToHomePage = () => {
        if (location.state.isAuth) {
            navigate("/home")
        } else {
            navigate("/")
        }
    }

    return (
        <div className='container'>
            <div className="kanban-header">
                <div className="kanban-infos">
                    <div 
                        className="kanban-return"
                        onClick={returnToHomePage}>
                        <ArrowBackIcon className='icon-back' />
                        <h5>Accueil</h5>
                    </div>
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
                
                {
                    location.state.isAuth && location.state.isOwner &&
                    <div className="menu">
                        <SettingsIcon 
                            className='icon'
                            onClick={() => setTogglePopupMenu(!togglePopupMenu)} />
                        
                        {
                            togglePopupMenu &&
                            <PopupMenu menuItems={[{option: "Inviter"}, {option: "Supprimer"}]} onItemClicked={(item) => onMenuItemClicked(item)} />
                        }
                        
                        {
                            toggleInviteUser &&

                            <Dialog
                                open={toggleInviteUser}
                                fullWidth={true}>
                                <div className="kanban-invite-user">
                                    <h3>Inviter un utilisateur </h3>
                                    <TextField 
                                        className='textfield' 
                                        label="Nom d'utilisateur" 
                                        variant='outlined'
                                        type="text"
                                        onChange={(e) => setUsername(e.target.value)} />
                                    

                                    <div className="btns">
                                        <Button 
                                            id='btn'
                                            variant='outlined' 
                                            color="primary" 
                                            disableElevation
                                            onClick={inviteUser}>
                                            Inviter
                                        </Button>
                                        <Button 
                                                id='btn'
                                                variant='outlined' 
                                                color="secondary" 
                                                disableElevation
                                                onClick={() => setToggleInviteUser(false)}>
                                            Annuler
                                        </Button>
                                    </div>
                                </div>
                            </Dialog>
                        }
                    </div>
                }
                
            </div>

            <div className='lists'>
                {
                    lists.map(list => (
                        <List key={list.lid} isOwner={location.state.isOwner} isAuth={location.state.isAuth} kanban={kanban} members={members} list={list} tasks={tasks.filter(task => task.list.lid === list.lid)} lists={lists} notifyTaskListChanged={(task) => taskChangedList(task)} notifyDataChanged={() => fetchTasks()} />
                    ))
                }
            </div>
        </div>
    )
}

export default Kanban
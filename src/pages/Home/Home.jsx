import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import "./home.css"

import AuthService from '../../services/AuthService'
import UserService from "../../services/UserService"

import ProfilPic from "../../assets/icons/man.png"
import KanbanForm from '../../components/main/KanbanForm/KanbanForm'
import Project from "../../components/main/Project/Project"
import KanbanService from '../../services/KanbanService'

import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const Home = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({})

    const [kanbans, setKanbans] = useState([])
    const [filteredKanbans, setFilteredKanbans] = useState([])
    
    const [filterValue, setFilterValue] = useState("tout")

    const [showKanbanForm, setShowKanbanForm] = useState(false)

    useEffect(() => {
        const authData = AuthService.authData()

        if (authData === null) {
            navigate("/", { replace: true })
        } else {
            fetchUser(authData.username)
        }
    }, [])

    const fetchUser = (username) => {
        UserService.getUserByUsername(username)
            .then(res => {
                setUser(res.data)
                localStorage.setItem("user", JSON.stringify(res.data))
                
                if (res.data === '') {
                    navigate("/")
                } else {
                    fetchUserKanbans(res.data.uid)
                }
            })
            .catch(err => {
                console.log("Home -> fetchUser -> failure : ", err)
                navigate("/")
            })
    }

    const fetchUserKanbans = (uid) => {
        KanbanService.getUserKanbans(uid)
            .then(res => {
                setKanbans(res.data)
                setFilteredKanbans(res.data)
            })
            .catch(err => {
                console.log("Home -> fetchUserKanbans -> failure 1 : ", err)
            })
    }

    const filterKanbans = (filter) => {
        if (filter === 'créé') {
            const createdKanbans = kanbans.filter(kanban => kanban.owner.uid === user.uid)
            setFilteredKanbans(createdKanbans)
        } else if (filter === "invité") {
            const userInvitedKanbans = kanbans.filter(kanban => kanban.owner.uid !== user.uid)
            setFilteredKanbans(userInvitedKanbans)
        } else {
            setFilteredKanbans(kanbans)
        }
    }

    const goToKanbanPage = (kanban) => {
        navigate("/home/kanban/" + kanban.kid, { 
            replace: true,
            state: {
                kanban: kanban
            }
        })
    }

    return (
        <div className='container'>
            <div className="profil">
                <img src={ProfilPic} alt="" id="icon" />
                <div className="username">
                    <h3>{user.firstname} {user.lastname}</h3>
                    <p>{user.username}</p>
                </div>
            </div>
            
            <div className='home-kanbans'>
                <div className="kanbans-header">
                    <h3>Vos kanbans</h3>

                    <div className="filters">
                        <FormControl id="filters-select">
                            <InputLabel id="filters-select-label">Filtres</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="filters-select"
                                label="filters"
                                value={filterValue}
                                onChange={(e) => {
                                    setFilterValue(e.target.value)
                                    filterKanbans(e.target.value)
                                }}>

                                <MenuItem value="tout">Tout</MenuItem>
                                <MenuItem value="créé">Créé</MenuItem>
                                <MenuItem value="invité">Invité</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="kanbans">
                    {
                        
                        filteredKanbans.map(kanban => (
                            <Project key={kanban.kid} kanban={kanban} seeMore={(kanban) => goToKanbanPage(kanban)} />
                        ))
                    }
                </div>

                {
                    showKanbanForm ?
                    <KanbanForm 
                        notifyDataChanged={() => fetchUserKanbans(user.uid)}
                        onClose={() => setShowKanbanForm(false)} />
                    :
                    <div className='btn-class'>
                        <Button 
                            id="btn-create-kanban"
                            variant='outlined' 
                            color="primary" 
                            disableElevation
                            onClick={() => {
                                setShowKanbanForm(true)
                            }}>
                            Créer un kanban
                        </Button>
                    </div>
                }

                

            </div>
        </div>
    )
}

export default Home
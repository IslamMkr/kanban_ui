import React, { useEffect, useState } from 'react'
import { 
    Button,
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Radio, 
    RadioGroup, 
    TextField 
} from '@mui/material'

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import ListIcon from '@mui/icons-material/List';

import KanbanService from "../../../services/KanbanService"

import './kanban-form.css'

const KanbanForm = () => {

    const [user, setUser] = useState(null)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState("PB")
    const [lists, setLists] = useState([])
    const [listname, setListname] = useState("")

    const [listForm, setListForm] = useState(false)

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"))

        setUser(userData)
    }, [])

    const removeListItem = (listname) => {
        const newListItems = lists.filter(list => list.listname !== listname)
    
        setLists(newListItems)
    } 

    const addListItem = () => {
        const listsnames = lists.map(list => list.listname)
        listsnames.push("Stories")
        listsnames.push("Terminée")
        
        if (!listsnames.includes(listname) && listname !== "") {
            const newList = [...lists, { listname: listname }]
    
            setLists(newList)
            setListname("")
        } else {
            setListname("")
        }
    }

    const createKanban = () => {
        setListname("")
        setListForm(false)

        if (title === "") {
            setError(true)

            return
        }

        setError(false)
        console.log(user)

        const kanban = {
            title: title,
            description: description,
            visibility: visibility,
            owner: {
                uid: user.uid, 
                firstname: user.firstname, 
                lastname: user.lastname,
                username: user.username
            },
            members: []
        }

        console.log(kanban)
        
        KanbanService.saveKanban(kanban)
            .then(res => {
                setSuccess(true)
                resetFields()
                notifyKanbanAddedSuccessfuly()
            })
            .catch(err => {
                console.log("failure : ", err)
            })
    }

    const notifyKanbanAddedSuccessfuly = () => {
        let seconds = 0
        let interval

        const increment = () => {
            seconds += 1
            //console.log(seconds)
            if (seconds === 3) {
                clearInterval(interval)
                setSuccess(false)
            }
        }

        interval = setInterval(increment, 1000)
    }

    const resetFields = () => {
        setTitle("")
        setDescription("")
        setVisibility("PB")
        setLists([])
    }

    return (
        <div className='kanban-form'>
            <div className='kanban-form-field'>
                <TextField 
                    className='textfield' 
                    label="Intitulé" 
                    variant='outlined'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div>
            
            <div className='kanban-form-field'>
                <TextField 
                    className='textfield' 
                    label="Description" 
                    variant='outlined'
                    value={description}
                    multiline
                    rows={4}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="kanban-form-field">
                <FormControl>
                    <FormLabel id="visibility-buttons-group-label">Visibilité</FormLabel>
                    
                    <RadioGroup
                        row={true}
                        aria-labelledby='visibility-buttons-group-label'
                        defaultValue="PB"
                        name='visibility-buttons-group'
                        onChange={(e) => setVisibility(e.target.value)}>
                        
                        <FormControlLabel value="PB" control={ <Radio /> } label="Public" />
                        <FormControlLabel value="PV" control={ <Radio /> } label="Privé" />

                    </RadioGroup>
                </FormControl>
            </div>

            <div className="kanban-form-field">
                <div className="lists-header">
                    <FormLabel id="lists">Colonnes</FormLabel>
                    <AddIcon className="icon icon-add" onClick={() => setListForm(true)} />
                </div>

                <div className='list-item'>
                    <div className="list-item-header">
                        <ListIcon />
                        <p>Stories</p>
                    </div>
                </div>
                
                <div className='list-item'>
                    <div className="list-item-header">
                        <ListIcon />
                        <p>Terminée</p>
                    </div>
                </div>

                {
                    lists.map(list => 
                        <div key={list.listname} className='list-item'>
                            <div className="list-item-header">
                                <ListIcon />
                                <p>{list.listname}</p>
                            </div>
                            <RemoveIcon className="icon icon-clear" onClick={() => removeListItem(list.listname)} />
                        </div>
                    )
                }

                {
                    listForm &&
                    <div className="list-form">
                        <TextField 
                            className='textfield' 
                            label="Intitulé de la colonne" 
                            variant='outlined'
                            value={listname}
                            onChange={(e) => setListname(e.target.value)} />

                        <AddIcon className="icon icon-add" onClick={addListItem} />
                        <ClearIcon className="icon icon-clear" onClick={() => setListForm(false)} />
                    </div>
                }
            </div>

            {
                error && 
                <p id='error'>Intitulé ne doit pas être vide !</p>
            }

            <Button 
                    id='btn'
                    variant='outlined' 
                    color="primary" 
                    disableElevation
                    onClick={createKanban}>
                Créer
            </Button>

            {
                success && 
                <p id='success'>Votre kanban est créé !</p>
            }
        </div>
    )
}

export default KanbanForm
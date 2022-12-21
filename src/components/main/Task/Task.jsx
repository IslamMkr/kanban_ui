import React, { useState } from 'react'

import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import dayjs from 'dayjs';

import "./task.css"
import PopupMenu from '../../reusable/PopupMenu/PopupMenu';

import TaskService from "../../../services/TaskService"
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const parse = require("html-react-parser")

const Task = ({ task, lists, notifyDataChanged, notifyTaskListChanged }) => {

    const [togglePopupMenu, setTogglePopupMenu] = useState(false)
    const [toggleMove, setToggleMove] = useState(false)


    const [listValue, setListValue] = useState(task.list.lid)

    const onMenuItemClicked = (item) => {
        setTogglePopupMenu(!togglePopupMenu)

        if (item === "Supprimer") {
            deleteTask()
        } else if (item === "Déplacer") {
            onMoveTaskRequest()
        }
    }

    const deleteTask = () => {
        TaskService.deleteTask(task.tid)
            .then(res => {
                if (res.data.type === "success") {
                    notifyDataChanged()
                } else {
                    console.error("Task -> deleteTask -> data not deleted : ", res)
                }
            })
            .catch(err => {
                console.error("Task -> deleteTask -> failure : ", err)
            })
    }

    const onMoveTaskRequest = () => {
        setToggleMove(!toggleMove)
    }
    
    const onListChanged = () => {
        setToggleMove(!toggleMove)

        if (listValue !== task.list.lid) {
            TaskService.updateTaskList(task.tid, listValue)
                .then(res => {
                    notifyTaskListChanged(res.data)
                })
                .catch(err => {
                    console.error("Task -> onListChange -> failure : ", err)
                })
        }
    }

    return (
        <div className='task'>

            <div className="task-header">
                <div className="task-title">
                    <AssignmentIcon className='icon icon-task' />
                    <h3>{task.title}</h3>
                </div>
                <div className="menu">
                    <MoreVertIcon 
                    onClick={() => {
                        if (!toggleMove && !togglePopupMenu) {
                            setTogglePopupMenu(!togglePopupMenu)
                        }
                    }} />

                    {
                        togglePopupMenu &&
                        <PopupMenu menuItems={[{option: "Déplacer"}, {option: "Supprimer"}]} onItemClicked={(item) => onMenuItemClicked(item)} />
                    }
                </div>
            </div>

            {
                toggleMove &&

                <div className="task-move">
                    <FormControl id="task-list-select">
                        <InputLabel id="task-list-select-label">Déplacer à :</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="task-list-select"
                                label="task-list"
                                value={listValue}
                                onChange={(e) => setListValue(e.target.value)}>
                                {
                                    lists.map(listItem => (
                                        <MenuItem key={listItem.lid} value={listItem.lid}>{listItem.title}</MenuItem>
                                    ))
                                }
                            </Select>
                    </FormControl>

                    <Button
                        variant='outlined'
                        onClick={onListChanged}>
                        Déplacer
                    </Button>
                </div>
            }

            <div className="task-content">
                <div className="task-description">
                    {
                        parse(task.description)
                    }
                </div>

                <div className="task-affectation">
                    <PersonIcon className='icon icon-person' />
                    <div className="task-affectation-text">
                        <p>Affecté à :</p>
                        <h4>{task.user === null ? 'Non affecté' : `{task.user.firstname} {task.user.lastname}`}</h4>
                    </div>
                </div>

                <div className="task-due-date">
                    <ScheduleIcon className='icon icon-date' />
                    
                    <div className="task-due-date-text">
                        <p>Date limite :</p>
                        {
                            task.time_limit !== null ?
                            <h4>{dayjs(task.time_limit).format("DD-MM-YYYY")}</h4> 
                            :
                            <h4>---</h4>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task
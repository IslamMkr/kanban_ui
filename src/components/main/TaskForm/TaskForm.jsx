import React, { useEffect, useState } from 'react'

import { 
    Button,
    FormControl,
    InputLabel, 
    MenuItem, 
    Select,
    Checkbox, 
    FormControlLabel,
    TextField
} from '@mui/material'

import ClearIcon from '@mui/icons-material/Clear';

import { useQuill } from 'react-quilljs';

import { MobileDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';

import TaskService from "../../../services/TaskService"

import 'quill/dist/quill.snow.css';
import './task-form.css'

const theme = 'snow';
// const theme = 'bubble';

const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
    ],
};

const placeholder = 'Description...';

const formats = ['bold', 'italic', 'underline', 'strike'];

const TaskForm = ({ kid, lid, kanbanMembers, onClose, notifyDataChanged }) => {
    const { quill, quillRef } = useQuill({ theme, modules, formats, placeholder })

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [taskManager, setTaskManager] = useState("non-affected")
    const [choseLimitDate, setChoseLimitDate] = useState(false)

    const [date, setDate] = useState(dayjs.date)

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                setDescription(quill.root.innerHTML)
            })
        }
    }, [quill, description])

    const createNewTask = () => {
        const task = {
            title: title,
            description: description,
            time_limit: choseLimitDate ? date : null,
            kanban: {
                kid: kid
            }, 
            user: taskManager === 'non-affected' ? null : {
                uid: taskManager
            },
            list: {
                lid: lid
            }
        }

        console.log(task)
        
        TaskService.saveTask(task)
            .then(res => {
                notifyDataChanged(res.data)
                resetFields()
            })
            .catch(err => {
                console.log("TaskForm -> createNewTask -> failure : ", err)
            })
    }

    const resetFields = () => {
        quill.setText("")
        setTitle("")
        setTaskManager("non-affected")
        setChoseLimitDate(false)
    }

    const onSetTaskManger = (managerUid) => {
        const manager = kanbanMembers.find(member => member.uid === managerUid)

        setTaskManager(manager.uid)
    }

    const handleDatePicking = (newDate) => {
        if (dayjs().isBefore(newDate)) {
            setDate(newDate)
        }
    }

    return (
        <div className='task-form'>
            <div className="task-form-header">
                <p>Nouvelle tâche</p>
                <ClearIcon className='icon icon-clear'
                    onClick={() => onClose()} />
            </div>

            <div className='task-form-field'>
                <TextField 
                    className='textfield' 
                    label="Titre" 
                    variant='outlined'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className='task-form-field'>
                <div ref={quillRef}></div>
            </div>

            <div className='task-form-field'>
                <FormControl id="task-manager-select">
                    <InputLabel id="task-manager-select-label">Affecter à :</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="task-manager-select"
                            label="task-manager"
                            value={taskManager}
                            onChange={(e) => onSetTaskManger(e.target.value)}>

                            <MenuItem value="non-affected">Non affecté</MenuItem>
                            
                            {
                                kanbanMembers !== undefined &&
                                kanbanMembers.map(member => (
                                    <MenuItem value={member.uid}>{member.firstname} {member.lastname}</MenuItem>
                                ))
                            }
                        </Select>
                </FormControl>
            </div>

            <div className='task-form-field date-picker'>
                <FormControlLabel id='form-control'
                    control={
                        <Checkbox 
                            checked={choseLimitDate}
                            onChange={() => { 
                                console.log("limitdate : ", !choseLimitDate)
                                setChoseLimitDate(!choseLimitDate)}} />
                    } 
                    label="Date limite" />

                {
                    choseLimitDate &&
                    <LocalizationProvider id="localization-provider" dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            label="Date limite"
                            inputFormat="MM/DD/YYYY"
                            value={date}
                            onChange={handleDatePicking}
                            renderInput={params => <TextField {...params} /> }
                            />
                    </LocalizationProvider>
                }
            </div>

            <Button
                id='btn'
                variant='outlined' 
                color="primary" 
                disableElevation
                onClick={createNewTask}>
                Créer
            </Button>
        </div>
    )
}

export default TaskForm
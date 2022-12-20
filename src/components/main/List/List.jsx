import React, { useEffect, useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

import TaskForm from '../TaskForm/TaskForm';

import TaskService from '../../../services/TaskService';

import "./list.css"
import Task from '../Task/Task';

const List = ({ kanban, list }) => {
    const [tasks, setTasks] = useState([])

    const [showTaskForm, setShowTaskForm] = useState(false)

    useEffect(() => {
        fetchTasks()
    }, [])

    const fetchTasks = () => {
        TaskService.getListTasks(list.lid)
            .then(res => {
                console.log(res.data)
                setTasks(res.data)
            })
            .catch(err => {
                console.log("List -> fetchTasks -> failure : ", err)
            })
    }

    return (
        <div className='list'>
            
            <div className="list-header">
                <p>{list.title}</p>
                <MoreVertIcon className='icon-options' />
            </div>

            <div className="add-task"
                onClick={() => setShowTaskForm(true)}>
                <AddIcon className=' icon-add' />
            </div>

            {
                showTaskForm &&
                <TaskForm kid={kanban.kid} lid={list.lid} onClose={() => setShowTaskForm(false)} notifyDataChanged={fetchTasks} />
            }

            <div className="list-content">

                <div className='list-tasks'>
                    {
                        tasks.map(task => (
                            <Task key={task.tid} task={task}/>
                        ))
                    }
                </div>
            </div>
        </div>
  )
}

export default List
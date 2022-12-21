import React, { useEffect, useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

import TaskForm from '../TaskForm/TaskForm';

import "./list.css"
import Task from '../Task/Task';
import PopupMenu  from '../../reusable/PopupMenu/PopupMenu';

const List = ({ kanban, list, members, tasks, lists, notifyDataChanged, notifyTaskListChanged }) => {

    const [showTaskForm, setShowTaskForm] = useState(false)
    const [toggleMenuItem, setToggleMenuItem] = useState(false)

    useEffect(() => {
    }, [])

    const onMenuItemClicked = (item) => {
        setToggleMenuItem(!toggleMenuItem)
    }

    const taskChangedList = () => {
        notifyTaskListChanged()
    }

    return (
        <div className='list'>
            
            <div className="list-header">
                <p>{list.title}</p>
                
                <div className="menu">
                    <MoreVertIcon className='icon-options'
                        onClick={() => { 
                            setToggleMenuItem(!toggleMenuItem)
                            console.log(toggleMenuItem)
                            }} />
                    
                    {
                        toggleMenuItem &&
                        <div>
                            <PopupMenu menuItems={[{option: "Supprimer"}]} onItemClicked={(item) => onMenuItemClicked(item)} />
                        </div>
                    }
                </div>
            </div>

            <div className="add-task"
                onClick={() => setShowTaskForm(true)}>
                <AddIcon className=' icon-add' />
            </div>

            {
                showTaskForm &&
                <TaskForm kid={kanban.kid} kanbanMembers={members} lid={list.lid} onClose={() => setShowTaskForm(false)} notifyDataChanged={() => notifyDataChanged()} />
            }

            <div className="list-content">

                <div className='list-tasks'>
                    {
                        tasks.map(task => (
                            <Task key={task.tid} task={task} lists={lists} notifyDataChanged={() => notifyDataChanged()} notifyTaskListChanged={(task) => taskChangedList(task)} />
                        ))
                    }
                </div>
            </div>
        </div>
  )
}

export default List
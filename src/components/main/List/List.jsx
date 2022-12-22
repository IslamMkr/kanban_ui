import React, { useEffect, useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

import TaskForm from '../TaskForm/TaskForm';

import "./list.css"
import Task from '../Task/Task';
import PopupMenu  from '../../reusable/PopupMenu/PopupMenu';
import { Dialog } from '@mui/material';

const List = ({ kanban, isOwner, isAuth, list, members, tasks, lists, notifyDataChanged, notifyTaskListChanged }) => {

    const [showTaskForm, setShowTaskForm] = useState(false)
    const [toggleMenuItem, setToggleMenuItem] = useState(false)

    useEffect(() => {
        console.log(kanban)
    }, [])

    const onMenuItemClicked = () => {
        setToggleMenuItem(!toggleMenuItem)
    }

    const taskChangedList = () => {
        notifyTaskListChanged()
    }

    return (
        <div className='list'>
            
            <div className="list-header">
                <p>{list.title}</p>
                
                {
                    isAuth && isOwner &&
                    <div className="menu">
                        <MoreVertIcon className='icon-options'
                            onClick={() => { setToggleMenuItem(!toggleMenuItem) }} />
                        
                        {
                            toggleMenuItem &&
                            <div>
                                <PopupMenu menuItems={[{option: "Supprimer"}]} onItemClicked={(item) => onMenuItemClicked(item)} />
                            </div>
                        }
                    </div>
                }
            </div>

            {
                isAuth && isOwner &&
                <div className="add-task"
                    onClick={() => setShowTaskForm(true)}>
                    <AddIcon className=' icon-add' />
                </div>
            }

            {
                showTaskForm &&
                <Dialog
                    open={showTaskForm}
                    fullWidth={true}>

                        <TaskForm kid={kanban.kid} kanbanMembers={members} lid={list.lid} onClose={() => setShowTaskForm(false)} notifyDataChanged={() => notifyDataChanged()} />
                </Dialog>
            }

            <div className="list-content">

                <div className='list-tasks'>
                    {
                        tasks.map(task => (
                            <Task key={task.tid} isOwner={isOwner} isAuth={isAuth} task={task} lists={lists} notifyDataChanged={() => notifyDataChanged()} notifyTaskListChanged={(task) => taskChangedList(task)} />
                        ))
                    }
                </div>
            </div>
        </div>
  )
}

export default List
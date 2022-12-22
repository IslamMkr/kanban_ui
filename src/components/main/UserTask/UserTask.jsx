import React from 'react'

import ScheduleIcon from '@mui/icons-material/Schedule';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

import dayjs from 'dayjs';

const parse = require("html-react-parser")

const UserTask = ({ task }) => {
    return (
        <div className='task'>
            
            <div className="kanban-title">
                <ViewKanbanIcon className='icon'/>
                <h2>{task.kanban.title}</h2>
            </div>

            <hr />

            <div className="task-header">
                <div className="task-title">
                    <AssignmentIcon className='icon icon-task' />
                    <h3>{task.title}</h3>
                </div>
            </div>

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
                        <h4>{task.user === null ? 'Non affecté' : task.user.firstname + " " + task.user.lastname}</h4>
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

export default UserTask
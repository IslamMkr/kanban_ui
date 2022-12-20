import React from 'react'

import ScheduleIcon from '@mui/icons-material/Schedule';

import dayjs from 'dayjs';

const parse = require("html-react-parser")

const Task = ({ task }) => {
    return (
        <div className='task'>
            <div className="task-header">
                {
                    parse(task.description)
                }
            </div>

            <div className="task-content">
                <div className="task-due-date">
                    <ScheduleIcon />
                    
                    {
                        task.time_limit !== null ?
                        <p>{dayjs(task.time_limit).format("DD-MM-YYYY")}</p> 
                        :
                        <p>---</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Task
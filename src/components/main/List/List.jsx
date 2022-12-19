import React, { useEffect, useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';

import "./list.css"

const List = ({ list }) => {
    const [tasks, setTasks] = useState([
        {
            tid: 1, 
            name: "Task"
        },
        {
            tid: 2, 
            name: "Task"
        },
        {
            tid: 3, 
            name: "Task"
        },
        {
            tid: 4, 
            name: "Task"
        }
    ])

    return (
        <div className='list'>
            
            <div className="list-header">
                <p>{list.title}</p>
                <MoreVertIcon className='icon-options' />
            </div>

            <div className="add-task">
                <AddIcon className=' icon-add' />
            </div>

            <div className="list-content">

                <div className='list-tasks'>
                    {
                        tasks.map(taks => (
                            <div key={taks.tid} className="task">
                                <p>{tasks.tid}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
  )
}

export default List
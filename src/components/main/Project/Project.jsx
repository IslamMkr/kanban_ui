import React from 'react'

import './project.css'

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';


const Project = ({ kanban, seeMore }) => {
    return (
        <article className='card'>
            <div className="card-project">
                <div className='card-icon'>
                    <PersonOutlineIcon id="icon" />
                    <p>{kanban.owner.firstname} {kanban.owner.lastname}</p>
                </div>
                <div className="card-icon">
                    <CalendarTodayIcon id="icon" />
                    <p>12 Sept. 2023</p>
                </div>
                <div className="card-icon">
                    <PeopleOutlineIcon id="icon" />
                    <p>{kanban.members.length} Membres</p>
                </div>
            </div>

            <div className="card-info">
                <h4 className='card-title'>{kanban.title}</h4>
                <p className='card-description'>{kanban.description}</p>
                <div className="card-icon" id="see-more" onClick={() => seeMore(kanban)}>
                    <p>Voir plus</p>
                    <ArrowRightAltOutlinedIcon id="icon" />
                </div>
            </div>
        </article>
    )
}

export default Project
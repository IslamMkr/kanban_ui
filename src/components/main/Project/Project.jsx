import React from 'react'

import './project.css'

const Project = () => {
    return (
        <article className='card'>
            <div className="card-project">
                <img src="#" alt="" />
                
                <div>
                    <span className='card-author'>
                        <i className='ri-user-line' /> Islam Mokrane
                    </span>

                    <span className='card-date'>
                        <i className='ri-calendar-line' /> 12 Sep. 2022
                    </span>
                </div>
            </div>

            <div className="card-info">
                <h2 className='card-title'>Projet universitaire - Kanban</h2>
                <p className='card-description'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.</p>
            </div>
        </article>
    )
}

export default Project
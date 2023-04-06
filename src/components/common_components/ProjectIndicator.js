import React from 'react'

function ProjectIndicator({project}) {
  return (
    <div className='container mx-auto g-3 mb-3'>
        <div className='row'>
                <div className='col-4'>
                        <div className="card text-center shadow p-3 mx-auto bg-light project-card">
                                <div className='card-body'>
                                <h3 className='card-title fs-3 mb-3'>Project Fitness</h3>
                                <p className="card-text fs-5 mb-5 text-info fw-bold fs-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill={project.fitness_indicator} class="bi bi-circle-fill" viewBox="0 0 16 16">
                                <circle cx="8" cy="8" r="8"/>
                                </svg>
                                </p>
                                </div>
                        </div>
                </div>
                <div className='col-4'>
                        <div className="card text-center shadow p-3 mx-auto bg-light project-card">
                                <div className='card-body'>
                                <h3 className='card-title fs-3 mb-3'>Concerns</h3>
                                <p className="card-text fs-5 mb-5 text-info fw-bold fs-3"> {project.concerns?.length || 0} </p>
                                </div>
                        </div>
                </div>
                <div className='col-4'>
                        <div className="card text-center shadow p-3 mx-auto bg-light project-card">
                                <div className='card-body'>
                                <h3 className='card-title fs-3 mb-3'>Team Size</h3>
                                <p className="card-text fs-5 mb-5 text-info fw-bold fs-3"> {project.team_members} </p>
                                </div>
                        </div>
                </div>
       
        </div>

</div>
    
  )
}

export default ProjectIndicator
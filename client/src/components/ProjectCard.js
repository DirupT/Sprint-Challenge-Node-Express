import React from 'react';

const ProjectCard = props => {
    return (
        <div className='project-card'>
            {!props.details ? <p className='project-title'><strong>{props.project.name}</strong></p> : null}
            {props.details ?
                <React.Fragment>
                    <div className='project-info'>
                        <h1>Project Info:</h1>
                        <p><strong>Name:</strong> {props.project.name}</p>
                        <p><strong>Description:</strong> {props.project.description}</p>
                        <p><strong>Completed:</strong> <span style={{ color: props.project.completed ? 'blue' : 'red' }}>{String(props.project.completed)}</span></p>
                    </div>
                    {props.actions ? props.actions.map(action => {
                        return (
                            <div className='actions-container' key={action.id}>
                                <h1>Action:</h1>
                                <p><strong>Description:</strong> {action.description}</p>
                                <p><strong>Notes:</strong> {action.notes}</p>
                                <p><strong>Completed:</strong> <span style={{ color: action.completed ? 'blue' : 'red' }}>{String(action.completed)}</span></p>
                            </div>
                        );
                    }) : null}
                </React.Fragment> : null
            }
        </div>
    );
}

export default ProjectCard;
import React from 'react';

const ProjectCard = props => {
    return (
        <div className='project-card'>
            <p><strong>{props.project.name}</strong></p>
            {props.details ?
                <React.Fragment>
                    <p><strong>Description:</strong> {props.project.description}</p>
                    <p><strong>Completed:</strong> {String(props.project.completed)}</p>
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
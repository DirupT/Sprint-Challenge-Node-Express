import React from 'react';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';

const Projects = props => {
    return (
        <div>
            {props.projects.map(project => <Link className='project-link' to={`/projects/${project.id}`} key={project.id}> <ProjectCard project={project} /> </Link>)}
        </div>
    );
}

export default Projects;
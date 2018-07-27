import React from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';

class Project extends React.Component {
    constructor() {
        super();

        this.state = {
            project: [],
            projectActions: []
        }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:8000/api/projects/${this.props.match.params.id}`)
            .then(response => {
                this.setState({ project: response.data });
                if (response.data.actions.length > 0) return this.fetchProjectActions();
            })
            .catch(err => console.log(err));
    }

    fetchProjectActions() {
        axios
            .get(`http://localhost:8000/api/projects/actions/${this.props.match.params.id}`)
            .then(response => this.setState({ projectActions: response.data }))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className='project-container'>
                <button onClick={() => this.props.history.push('/')}>Home</button>
                <ProjectCard project={this.state.project} actions={this.state.projectActions} details={true} />
            </div>
        );
    }
}

export default Project;
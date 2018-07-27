import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Projects from './components/Projects';
import Project from './components/Project';
import { Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();

    this.state = {
      projects: []
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:8000/api/projects/')
      .then(response => this.setState({ projects: response.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Route exact path='/' render={props => <Projects {...props} projects={this.state.projects} />} />
        <Route exact path='/projects/:id' component={Project} />
      </div>
    );
  }
}

export default App;

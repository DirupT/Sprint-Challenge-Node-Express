import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      projects: [],
      actions: []
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

      </div>
    );
  }
}

export default App;
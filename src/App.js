import React, { Component } from 'react';
import './App.css';

//Components
import Audio from './components/Audio'

class App extends Component {

  state = {
    component: "TEST"
  }

  render() {
    return (
      <div className="App">
        <Audio />
      </div>
    );
  }
}

export default App;

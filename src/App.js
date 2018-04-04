import React, { Component } from 'react';
import './App.css';

//Components
import Canvas from './components/Canvas'
import Test from './components/Test'
import Audio from './components/Audio'

class App extends Component {

  state = {
    component: "TEST"
  }

  renderSwitch(state){
    switch(state){
      case "TEST":
        return <Test />
      case "CANVAS":
        return <Canvas />
      default:
        return <Canvas />
    }
  }

  render() {
    return (
      <div className="App">
        <button onClick={() => this.setState({component: "TEST"})}>Test</button>
        <button onClick={() => this.setState({component: "CANVAS"})}>Canvas</button>
        {
          // this.renderSwitch(this.state.component)
        }
        <Audio />
      </div>
    );
  }
}

export default App;

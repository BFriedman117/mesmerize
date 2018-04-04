import React, { Component } from 'react'
import mp3 from '../X.wav'

import Vis from './Vis'

class Audio extends Component {

  state = {
    audio: null
  }

  componentDidMount(){
    const audio = this.refs.audio
    this.setState({ audio: this.refs.audio })
    audio.src = mp3
    audio.crossOrigin = 'anonymous'
    audio.autoplay = true
    audio.muted = true
  }

  render(){
    console.log('state: ', this.state)
    return (
      <div className="audio-container">
        <audio ref="audio" />
        {
          this.state.audio ?
          <Vis audio={ this.state.audio } /> :
          null
        }
      </div>
    )
  }
}

export default Audio

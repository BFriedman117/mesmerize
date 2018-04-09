import React, { Component } from 'react';

class Test extends Component {

  componentDidMount(){
    const canvas = this.refs.canvas;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const c = canvas.getContext('2d');

    window.addEventListener('resize', function(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    })

    // // c.fillRect(0, 0, canvas.width, canvas.height)
    // c.fillStyle = "black"
    // c.fill()

    let a = new AudioContext()
    let analyser = a.createAnalyser()
    let source = a.createMediaElementSource(this.props.audio)
    source.connect(analyser)
    analyser.connect(a.destination)
    analyser.fftSize = 512
    analyser.minDecibels = -90
    analyser.maxDecibels = -1
    // analyser.smoothingTimeConstant = .5;

    let fbc = new Uint8Array(analyser.frequencyBinCount)

    let x = canvas.width / 2
    let y = canvas.height / 2


    function animate(){
      requestAnimationFrame(animate);
      c.clearRect(0, 0, window.innerWidth, window.innerHeight)
      analyser.getByteFrequencyData(fbc)

      let radians = 200
      for (let i = 0; i < fbc.length; i++){
        radians++
        let bar_x = x + Math.cos(radians) * fbc.length
        let bar_y = y + Math.sin(radians) * fbc.length
        let width = canvas.width / fbc.length
        let height = -(fbc[i])
        c.fillStyle = "blue"
        c.shadowBlur = 5
        c.shadowColor = "white"
        c.fillRect(bar_x, bar_y, width, height)
      }

    }

    animate()
  }

  render (){
    return (
      <div className="canvas-container">
        <canvas ref="canvas" background="black"/>
      </div>
    )
  }
}

export default Test;

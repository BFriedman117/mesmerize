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


    function animate(){
      requestAnimationFrame(animate);
      c.clearRect(0, 0, window.innerWidth, window.innerHeight)
      analyser.getByteFrequencyData(fbc)

      for (let i = 0; i < fbc.length; i++){
        let x = (canvas.width / fbc.length) * i
        let y = canvas.height
        let width = canvas.width / fbc.length
        let height = -(fbc[i] * 4)
        c.fillStyle = "blue"
        c.shadowBlur = 5
        c.shadowColor = "white"
        c.fillRect(x, y, width, height)
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

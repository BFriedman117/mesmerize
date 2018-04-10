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
    analyser.fftSize = 512 / 2
    analyser.minDecibels = -90
    analyser.maxDecibels = -1
    // analyser.smoothingTimeConstant = .5;

    let fbc = new Uint8Array(analyser.frequencyBinCount)

    let x = canvas.width / 2
    let y = canvas.height / 2 + 30
    let angle
    let peak = false
    let radius = 250
    let bar_x, bar_y, width, height


    function animate(){
      requestAnimationFrame(animate);
      c.clearRect(0, 0, window.innerWidth, window.innerHeight)
      analyser.getByteFrequencyData(fbc)

      for (let i = 5; i < fbc.length; i++){
        peak = (fbc[i] > 75)
        angle = (i / (fbc.length / 2)) * Math.PI

        bar_x = x + Math.cos(angle) * radius
        bar_y = y + Math.sin(angle) * radius
        width = canvas.width / fbc.length
        height = -(fbc[i])

        c.fillStyle = peak ? "white" : "#5bcbff"
        c.shadowBlur = peak ? 50 : 15
        c.shadowColor = peak ? "white" : "#05f2ff"

        c.fillRect(bar_x, bar_y, 3, height)
      }

    }

    animate()
  }

  render (){
    return (
      <div className="canvas-container">
        <canvas ref="canvas" />
      </div>
    )
  }
}

export default Test;

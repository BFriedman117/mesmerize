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


    let a = new AudioContext()
    let analyser = a.createAnalyser()
    let source = a.createMediaElementSource(this.props.audio)
    source.connect(analyser)
    analyser.connect(a.destination)
    analyser.fftSize = 512 / 2
    analyser.minDecibels = -90
    analyser.maxDecibels = -1

    let fbc = new Uint8Array(analyser.frequencyBinCount)

    let x = canvas.width / 2
    let y = canvas.height / 2 + 30
    let angle
    let peak = false
    let radius = 100
    let line_height = 70
    let inner_x, inner_y, outer_x, outer_y, width, height


    function animate(){
      requestAnimationFrame(animate);
      c.clearRect(0, 0, window.innerWidth, window.innerHeight)
      analyser.getByteFrequencyData(fbc)

      for (let i = 4; i < fbc.length; i++){
        peak = (fbc[i] > 75)
        angle = (i / (fbc.length / 2)) * Math.PI

        inner_x = x + Math.cos(angle) * radius
        inner_y = y + Math.sin(angle) * radius
        outer_x = x + Math.cos(angle) * (radius + line_height + fbc[i])
        outer_y = y + Math.sin(angle) * (radius + line_height + fbc[i])
        width = canvas.width / fbc.length
        height = -(fbc[i])

        c.strokeStyle = peak ? "white" : "#5bcbff"
        c.shadowBlur = peak ? 50 : 15
        c.shadowColor = peak ? "white" : "#05f2ff"
        c.lineWidth = peak ? 15 : 3

        c.beginPath()
        c.moveTo(inner_x, inner_y)
        c.lineTo(outer_x, outer_y)
        c.stroke()
        // c.fillRect(bar_x, bar_y, 3, height)
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

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
    let line_width = 2
    let inner_x, inner_y, outer_x, outer_y, width, height, grd

    let average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length

    function animate(){
      requestAnimationFrame(animate);
      c.clearRect(0, 0, window.innerWidth, window.innerHeight)
      analyser.getByteFrequencyData(fbc)

      let avg = average(fbc) / 5

      grd = c.createRadialGradient(x, y, avg / 2, x, y, 500 + (avg * 2))
      grd.addColorStop(0,"white");
      grd.addColorStop(0.2,"#70767f");
      grd.addColorStop(1,"#313438");

      c.fillStyle = grd
      c.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < fbc.length; i++){
        inner_x = x + Math.cos(angle) * radius
        inner_y = y + Math.sin(angle) * radius
        peak = (fbc[i] > 75)
        angle = (i / (fbc.length / 2)) * Math.PI

        outer_x = x + Math.cos(angle) * (radius + line_height + fbc[i])
        outer_y = y + Math.sin(angle) * (radius + line_height + fbc[i])

        c.strokeStyle = peak ? "white" : "#5bcbff"
        c.shadowBlur = peak ? 50 : 15
        c.shadowColor = peak ? "white" : "#05f2ff"
        c.lineWidth = peak ? line_width * 5 : line_width

        c.beginPath()
        c.moveTo(inner_x, inner_y)
        c.lineTo(outer_x, outer_y)
        c.stroke()
      }

      c.beginPath()

      for (let i = 0; i < fbc.length; i++){
        angle = (i / (fbc.length / 2)) * Math.PI

        outer_x = x + Math.cos(angle) * (radius + line_height + 15 + fbc[i])
        outer_y = y + Math.sin(angle) * (radius + line_height + 15 + fbc[i])

        c.lineTo(outer_x, outer_y)
        c.shadowBlur = 0
        c.strokeStyle = "#e3e4e5"
        c.lineWidth = 1
        c.stroke()
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

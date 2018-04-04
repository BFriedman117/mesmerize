import React, { Component } from 'react';
// import { test } from '../scripts/test'

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
    analyser.fftSize = 8192
    analyser.minDecibels = -90
    analyser.maxDecibels = -1
    analyser.smoothingTimeConstant = .5;

    let fbc = new Uint8Array(analyser.frequencyBinCount)

    function average(arr){
      let total = 0;

      for (let i = 0; i < arr.length; i++){
        total += arr[i]
      }

      return Math.round(total / arr.length)
    }

    function quarter(n){
      return Math.floor(n / 4)
    }

    let fbc_quarter = quarter(fbc.length)


    let avg, low, lowMid, hiMid, hi

    let four = [10, 10, 10, 10]
    let peaks = {}

    function animate(){
      requestAnimationFrame(animate);
      c.clearRect(0, 0, window.innerWidth, window.innerHeight)
      analyser.getByteFrequencyData(fbc)

      avg = average(fbc)
      low = average(fbc.slice(0, fbc_quarter))
      lowMid = average(fbc.slice(fbc_quarter, fbc_quarter * 2))
      hiMid = average(fbc.slice(fbc_quarter * 2, fbc_quarter * 3))
      hi = average(fbc.slice(fbc_quarter * 3))
      four = [low, lowMid, hiMid, hi]
      // console.log(peaks)

      four = four.map(n => n * 3)

      for (let i = 0; i < four.length; i++){
        if (!peaks[i]) peaks[i] = four[i];
        if (four[i] > peaks[i]) {
          peaks[i] = four[i]
        }
        if (four[i] > peaks[i] / 2){
          let x = (canvas.width / 4) * i
          let y = canvas.height
          let width = canvas.width / 4
          let height = -(((canvas.height / 2) / 255 * 200))
          // let height = -(((canvas.height / 2) / 255 * four[i]))
          c.fillRect(x, y, width, height)
        }

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

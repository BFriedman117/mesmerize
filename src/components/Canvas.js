import React, { Component } from 'react';
// import { test } from '../scripts/test'

class Canvas extends Component {

  componentDidMount(){
    const canvas = this.refs.canvas;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;

    const c = canvas.getContext('2d');


    window.addEventListener('resize', function(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    })

    let circles = [];
    let colors = ['white', 'yellow', '#02dded', 'blue', 'purple', 'red', '#e83414','pink']

    function Circle(x, y, dx, dy, radius, color, max){
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.originalRadius = radius;
      this.color = color;
      this.count = 0
      this.direction = true
      this.max = max

      this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = this.color
        c.stroke();
        // c.fillStyle = 'black';
        // c.fill();
      }

      this.update = function(){

        this.count += 2

        if (this.count % this.max === 0){
          this.direction ? this.direction = false : this.direction = true
        }
        if (this.count % this.max * 2 === 0){
          this.color = colors[(colors.indexOf(this.color) + 1) % colors.length]
        }

        this.radius = this.direction ? this.radius + this.count % 4 : this.radius - this.count % 4


        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
          this.dx = -this.dx
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
          this.dy = -this.dy
        }

        this.draw()

      }
    }



    let fib = [1,1]
    let colorWheel = 0
    for (var i = 0; i < 9; i++){
      let radius = 1
      // let x = Math.random() * (innerWidth - radius * 2) + radius;
      // let y = Math.random() * (innerHeight - radius * 2) + radius;
      let x = innerWidth / 2
      let y = innerHeight / 2;
      let dx = (Math.random() * .5) * 10;
      let dy = (Math.random() * .5) * 10;
      let color = colors[colorWheel % colors.length]
      let max = fib[fib.length - 1] * 100
      circles.push(new Circle(x, y, dx, dy, radius, color, max))
      fib.push(fib[fib.length -1] + fib[fib.length - 2])
      colorWheel++
    }



    function animate(){
      requestAnimationFrame(animate);
      c.fillStyle = 'rgba(255, 255, 255, 0.01)';
      c.fillRect(0, 0, innerWidth, innerHeight);
      circles.forEach(circle => circle.update())

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

export default Canvas;

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

    function Circle(x, y, dx, dy, radius, color){
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color || 'black'
      this.count = 0
      this.direction = true

      this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = color
        c.stroke()
      }

      this.update = function(){

        this.count++

        if (this.count % 1000 === 0){
          this.direction ? this.direction = false : this.direction = true
        }

        if (this.radius > 0){
          this.radius = this.direction ? this.radius + this.count % 4 : this.radius - this.count % 4
        }

        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0){
          this.dx = -this.dx
        }
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0){
          this.dy = -this.dy
        }
        this.x += this.dx * 2 ;
        this.y += this.dy * 2 ;

        this.draw()

      }
    }




    let circles = [];
    let colors = ['black', 'white']

    for (var i = 0; i < 10; i++){
      var radius = Math.random() * 100
      var x = Math.random() * (window.innerWidth - radius * 2) + radius;
      var y = Math.random() * (window.innerHeight - radius * 2) + radius;
      var dx = (Math.random() * .5) * 10
      var dy = (Math.random() * .5) * 10
      var color = colors[Math.floor(Math.random() * colors.length)]

      if (i === 1){
        circles.push(new Circle(x, y, dx, dy, radius, 'red'));
      } else {
          circles.push(new Circle(x, y, dx, dy, radius, color))
      }
    }



    function animate(){
      requestAnimationFrame(animate);
      //Clears canvas each frame- causes circles to bounce around rather than fill screen:
      // c.clearRect(0, 0, innerWidth, innerHeight);
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

export default Test;

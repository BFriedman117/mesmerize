
export const test = function (){
  let x = 200;
  return function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    c.fillRect(x, 200, 200, 200)
    x += 1
  }
}

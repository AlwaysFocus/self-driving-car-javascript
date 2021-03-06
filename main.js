// Set up our canvas dimensions
const canvas = document.getElementById("carCanvas");

canvas.width = 200;

// Get 2d context for the canvas
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

// Animate everything
animate();
function animate() {
  car.update(road.borders);

  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);

  road.draw(ctx);
  car.draw(ctx);

  ctx.restore();
  requestAnimationFrame(animate);
}

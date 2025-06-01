const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resize();
window.addEventListener('resize', resize);

// Creamos muchas estrellas con posiciones aleatorias y brillo variable
const starsCount = 200;
const stars = [];

for (let i = 0; i < starsCount; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.2 + 0.3,
    alpha: Math.random(),
    delta: 0.01 + Math.random() * 0.02 // Velocidad para parpadear
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  
  for (let star of stars) {
    // Cambiamos el alpha para hacer que parpadeen
    star.alpha += star.delta;
    if (star.alpha <= 0) {
      star.alpha = 0;
      star.delta = -star.delta;
    } else if (star.alpha >= 1) {
      star.alpha = 1;
      star.delta = -star.delta;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  }
  
  requestAnimationFrame(draw);
}

draw();

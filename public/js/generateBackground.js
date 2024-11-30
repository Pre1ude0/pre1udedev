const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.classList.add("background");
document.body.appendChild(canvas);

const dots = [];

function drawCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const spacing = 30;
  let rows = window.innerHeight / spacing;
  let cols = window.innerWidth / spacing;

  console.log(rows, cols);

  dots.length = 0;

  // Initialize dots
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      dots.push({
        x: x * spacing + spacing / 2,
        y: y * spacing + spacing / 2,
        size: 4,
      });
    }
  }

  generateBackground(-9999, -9999);
}

function generateBackground(mouseX, mouseY) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  dots.forEach((dot) => {
    const distance = Math.hypot(mouseX - dot.x, mouseY - dot.y);
    const size = Math.max(4, 8 - (distance / 500) * (8 - 4));
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  });
}

window.drawCanvas = drawCanvas;
window.generateBackground = generateBackground;

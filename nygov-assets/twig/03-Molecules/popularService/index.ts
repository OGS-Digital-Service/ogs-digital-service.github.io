import "./popularService.scss";

function draw() {
  const docWidth: number = window.innerWidth;
  const canvas: HTMLCanvasElement | null = document.querySelector('#popularServicesCanvasSection');
  if (canvas === null) return false;

  //Default Canvas
  let height: number = 20;
  canvas.height = 20;


  //Tablet Canvas
  if (docWidth >= 768) {
    height = 30;
    canvas.height = 30;
  }

  if (docWidth < 1280) {
    if (!canvas.getContext) return false;
    canvas.width = docWidth;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx === null) return false;
    ctx.beginPath();
    ctx.fillStyle = "#154973";
    ctx.moveTo(0, 0); // start at top left corner of canvas
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width / 2, height);
    ctx.fill();
    return true;
  }
  if (!canvas.getContext) return false;
  canvas.width = 50;
  canvas.height = 220;
  const ctx = canvas.getContext('2d');
  if (ctx === null) return false;
  ctx.beginPath();
  ctx.fillStyle = "#154973";
  ctx.moveTo(0, 0); // start at top left corner of canvas
  ctx.lineTo(50, 100);
  ctx.lineTo(0, canvas.height);
  ctx.fill();
  return true;
};

window.addEventListener('load', draw);
window.addEventListener('resize', draw, false);
const canvas = document.querySelector("canvas");
canvas.height = canvas.offsetHeight;
canvas.width = canvas.offsetWidth;

const ctx = canvas.getContext("2d");
const clearBTn = document.querySelector("button");

clearBTn.addEventListener("click", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

const container = document.querySelector(".tools");
let shape = "";
for (let i = 0; i < container.children.length; i++) {
  container.children[i].addEventListener("click", () => {
    shape = container.children[i].id;
    console.log(shape);
  });
}

let strokeStyle = "", lineWidth = 2;
const color = document.querySelectorAll(".color");
color.forEach((color) => {
  color.addEventListener("click", () => {
    strokeStyle = color.value;
  });
});

const mouse = {
  sx: null,
  sy: null,
  ispressed: false,
  released: false,
  ex: null,
  ey: null,
  px: null,
  py: null
};

let snapshot;

canvas.addEventListener("mousedown", (e) => {
  mouse.ispressed = true;
  mouse.sx = e.offsetX;
  mouse.sy = e.offsetY;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
});

canvas.addEventListener("mouseup", (e) => {
  mouse.released = true;
  mouse.ex = e.offsetX;
  mouse.ey = e.offsetY;
  mouse.ispressed = false;
  mouse.released = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (mouse.ispressed && !mouse.released) {
    if (shape == "circle") {
      drawCircle(e);
    } else if (shape == "square") {
      drawRect(e);
    } else if (shape == "triangle") {
      drawTriangle(e);
    } else if (shape == "Hline") {
      drawHLine(e);
    } else if (shape == "Vline") {
      drawVLine(e);
    } else {
      drawBush(e);
    }
  }
});

function drawCircle(e) {
  ctx.putImageData(snapshot, 0, 0);

  let dx = e.offsetX - mouse.sx;
  let dy = e.offsetY - mouse.sy;
  let radius = Math.sqrt(dx * dx + dy * dy);

  if (mouse.ispressed && !mouse.released) {
    ctx.beginPath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.arc(mouse.sx, mouse.sy, Math.abs(radius), 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
  }
}

function drawRect(e) {
  ctx.putImageData(snapshot, 0, 0);
  let width = e.offsetX - mouse.sx;
  let height = e.offsetY - mouse.sy;
  if (!mouse.released) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(mouse.sx, mouse.sy, width, height);
  }
}

function drawTriangle(e) {
  ctx.putImageData(snapshot, 0, 0);
  if (!mouse.released && mouse.ispressed) {
    const x1 = mouse.sx;
    const y1 = mouse.sy;

    const x2 = e.offsetX;
    const y2 = y1;

    const x3 = (x1 + x2) / 2;
    const y3 = e.offsetY;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawHLine(e) {
  ctx.putImageData(snapshot, 0, 0);
  if (!mouse.released && e.offsetX != mouse.sx) {
    ctx.moveTo(mouse.sx, mouse.sy);
    ctx.lineTo(e.offsetX, mouse.sy);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawVLine(e) {
  ctx.putImageData(snapshot, 0, 0);
  if (!mouse.released && e.offsetY != mouse.sy) {
    ctx.moveTo(mouse.sx, mouse.sy);
    ctx.lineTo(mouse.sx, e.offsetY);
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function drawBush(e) {
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

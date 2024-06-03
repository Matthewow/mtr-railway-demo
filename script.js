const canvas = document.getElementById("railwayCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const rectangles = [];

// Function to add a rectangle (representing a railway)
function addRailway(
  x,
  y,
  width,
  height,
  info,
  angle = 0,
  fillColor = "gray",
  insideText = ""
) {
  const rect = {
    x: x,
    y: y,
    width: width,
    height: height,
    info: info,
    angle: angle,
    fillColor: fillColor,
    insideText: insideText,
  };
  rectangles.push(rect);
  drawRectangle(rect);

  return rect;
}

// Function to draw a rectangle on the canvas
function drawRectangle(rect) {
  ctx.save();
  ctx.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
  ctx.rotate((rect.angle * Math.PI) / 180);
  ctx.fillStyle = rect.fillColor;

  ctx.fillRect(-rect.width / 2, -rect.height / 2, rect.width, rect.height);

  if (rect.insideText) {
    ctx.fillStyle = "black"; // Text color, can be customized
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(rect.insideText, 0, 0);
  }

  ctx.restore();
}

// Click event listener for canvas
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  rectangles.forEach((rect) => {
    // Need to calculate the rotated rectangles click detection
    const sin = Math.sin((rect.angle * Math.PI) / 180);
    const cos = Math.cos((rect.angle * Math.PI) / 180);
    const rectX = rect.x + rect.width / 2;
    const rectY = rect.y + rect.height / 2;

    const dx = x - rectX;
    const dy = y - rectY;

    const xRot = dx * cos + dy * sin;
    const yRot = dy * cos - dx * sin;

    if (
      xRot >= -rect.width / 2 &&
      xRot <= rect.width / 2 &&
      yRot >= -rect.height / 2 &&
      yRot <= rect.height / 2
    ) {
      alert(rect.info);
    }
  });
});

// Example of how to use the addRailway function
//x, y, width, height, info, angle, fillColor, insideText

//E2001
addRailway(40, 195, 10, 40, "E2001 Alert", 0, "#555", "");
addRailway(50, 200, 100, 30, "E2001 Alert", 0, "#ccc", "E2001");
addRailway(190, 200, 100, 30, "E2001 Alert", 0, "#555", "E2001");

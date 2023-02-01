// CHANGE BRUSH SIZE HERE!
let brushSize = 25;

// Default color is black
let brushRed = 0;
let brushBlue = 0;
let brushGreen = 0;

let menuButtons;
let xImage;

function preload() {
  xImage = loadImage("assets/trash.png");
}

function setup() {
  createCanvas(720, 720);
  background(220);
  noStroke();
  colorMode(RGB, 255, 255, 255, 1);

  // Defines Button Objects for the Color Menu
  menuButtons = [
    new Button(220, 80, 62), // Red
    new Button(227, 140, 72), // Orange
    new Button(255, 247, 110), // Yellow
    new Button(149, 239, 96), // Green
    new Button(148, 246, 250), // Cyan-ish Teal?
    new Button(0, 76, 237), // Blue
    new Button(218, 106, 242), // Magenta
    new Button(116, 73, 39), // Brown
    new Button(255, 255, 255), // White
    new Button(0, 0, 0), // Black
  ];
}

function draw() {

  //Color Menu Creation
  for(let i=0;i < menuButtons.length;i++) {
    menuButtons[i].draw(i+1);
  }

  // Delete Button Creation
  push();
  translate(width-(width/6),height-(height/6));
  scale(0.1,0.09);
  image(xImage,0,0);
  pop();

  // Drawing
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      drawBrush(mouseX,mouseY,brushSize);
    }
  }
}

// ---------------------------------
// -------- OTHER FUNCTIONS --------
// ---------------------------------
function clearCanvas() {
  background(220);
}

function drawBrush(x,y,size) {
  fill(brushRed, brushGreen, brushBlue);
  circle(x,y,size);
}

function mousePressed() {
  // First checks if mouse is pressed over the X button image.
  // yes i know the verification is overcomplicated. It first checks the X axis left && right, then Y axis up && down, if the mouse is close by.
  if (mouseX >= (width-(width/6)) && mouseX <= (width-(width/6)) + 80 && mouseY >= (height-(height/6) && mouseY <= (height-(height/6)) + 80)) {
    clearCanvas();
  }
  // If not over the X, then continues to draw.
  else {
    for(let i=0;i < menuButtons.length;i++) {
      menuButtons[i].mousePressed();
    }
  }
}

// -------------------------
// -------- OBJECTS --------
// -------------------------
class Button {
  constructor(redColor, greenColor, blueColor) {
    this.x = 10;
    this.y;
    this.size = 25

    this.redColor = redColor;
    this.greenColor = greenColor;
    this.blueColor = blueColor;

    console.log("constructed button at: ",this.x,this.size);
  }

  draw(sequence) {
    this.y = 10+(30*sequence);
    push();
    strokeWeight(5);
    stroke(220);
    fill(this.redColor, this.greenColor, this.blueColor);
    square(this.x,this.y,this.size);
    pop();
  }

  contains(x,y) {
    let insideX = x >= this.x && x <= this.x + this.size;
    let insideY = y >= this.y && y <= this.y + this.size;
  
    // console.log("in x:",insideX);
    // console.log("in y:",insideY);
    return insideX && insideY;    
  }

  mousePressed() {
    let inside = this.contains(mouseX,mouseY);
    if (inside) {
      brushRed = this.redColor;
      brushGreen = this.greenColor;
      brushBlue = this.blueColor;
    }
  }
}
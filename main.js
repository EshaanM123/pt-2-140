let song1;
let song2;

function preload() {
  song1 = loadSound("song1.mp3");
  song2 = loadSound("song2.mp3");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.center();
  let webcam = createCapture(VIDEO);
  webcam.hide();
}

function draw() {
  image(webcam, 0, 0, width, height);
}

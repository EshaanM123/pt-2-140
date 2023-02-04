let song1;
let song2;
let rightWristScore = 0;
let song2Status = "";

var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;

function preload() {
  song1 = loadSound("song1.mp3");
  song2 = loadSound("song2.mp3");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.center();
  let webcam = createCapture(VIDEO);
  webcam.hide();
  posenet.load().then(function(net) {
    model = net;
    modelLoaded();
  });
}

function draw() 
{
  image(webcam, 0, 0, width, height);
  model.estimateSinglePose(video, {
    flipHorizontal: true
  }).then(function(poses) {
    gotPoses(poses);
  });
  fill(255, 0, 0);
  stroke(0, 255, 0);
  strokeWeight(2);

  let song1Status = song1.isPlaying();
  let song2Status = song2.isPlaying();
  song2Status = song2.isPlaying();
  song1Status = song1.isPlaying();

  if (leftWristScore > 0.2) {
    circle(leftWristX, leftWristY, 50);
    song2.stop();

    if (!song1Status) {
      song1.play();
      songStatus = 'song1';
    }
}
}

function modelLoaded() {
  console.log('Posenet model loaded');
}

function gotPoses(poses) 
{
  if (poses.length > 0) {
    leftWristX = poses[0].pose.leftWrist.x;
    leftWristY = poses[0].pose.leftWrist.y;
    rightWristX = poses[0].pose.rightWrist.x;
    rightWristY = poses[0].pose.rightWrist.y;
  }
  if (poses.length > 0) {
    leftWristScore = poses[0].pose.keypoints[9].score;
  }
  if (poses.length > 0) {
    rightWristScore = poses[0].pose.keypoints[9].score;
  }
  if (rightWristScore > 0.2) {
    ellipse(poses[0].pose.keypoints[10].position.x, poses[0].pose.keypoints[10].position.y, 20, 20);

    song1.stop();
  }
    if (!song2Status) {
      song2.play();

      document.getElementById("song").innerHTML = "Song 2";
}
document.getElementById('song').innerHTML = songStatus;
  }

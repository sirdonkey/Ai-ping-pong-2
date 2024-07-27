let.video
let.posenet
let poses = [];
let rightWristX, rightWristY, rightWristScore;

function setup() {
  createCanvas(640, 480).parent('canvasContainer');
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); 

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function draw() {
  image(video, 0, 0, width, height);

  if (rightWristScore > 0.2) {
    fill(255, 0, 0); 
    stroke(255, 0, 0); 
    circle(rightWristX, rightWristY, 20); 
  }
}

function modelLoaded() {
  console.log('PoseNet model loaded');
}

function gotPoses(results) {
  if (results.length > 0) {
    let poses = results[0].pose;
    rightWristX = poses.rightWrist.x;
    rightWristY = poses.rightWrist.y;
    rightWristScore = poses.keypoints[10].score;
  }
}

function draw() {
    image(video, 0, 0, width, height);
  
    if (rightWristScore > 0.2) {
      fill(255, 0, 0); 
      stroke(255, 0, 0); 
      circle(rightWristX, rightWristY, 20); 
    }
  
    
    paddle1Y = rightWristY;
  }

  let ballTouchPaddleSound;
  let missedSound;
  
  function preload() {
    ballTouchPaddleSound = loadSound('ball_touch_paddle.wav');
    missedSound = loadSound('missed.wav');
  }
  
  function setup() {
    createCanvas(640, 480).parent('canvasContainer'); 
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide(); 
  
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
  }
  
  function move() {
    if (ball.x > paddle1.x && ball.x < paddle1.x + paddleWidth && ball.y > paddle1.y && ball.y < paddle1.y + paddleHeight) {
      ballTouchPaddleSound.play(); 
    } else if (ball.x < 0) {
      missedSound.play();
    }
  }
  
  function restart() {
    pcscore = 0;
    playerscore = 0;
    loop(); 
  }

  function draw() {
    image(video, 0, 0, width, height);
  
    if (rightWristScore > 0.2) {
      fill(255, 0, 0);
      stroke(255, 0, 0);
      circle(rightWristX, rightWristY, 20);
    }
  
    
    paddle1Y = rightWristY;
  
    if (gameIsOver) {
      textSize(32);
      fill(255);
      textAlign(CENTER, CENTER);
      text('Press Restart Button To Play Again', width / 2, height / 2);
      noLoop(); 
    }
  }
  
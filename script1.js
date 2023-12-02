let background1;
let rotatingImage;
let runningImages=[];
let balloonImage;
let fireworks=[];
let currentImage;
let scene = 1;
let ifBalloon = true;
let balloons=[];
let trianx;
let triany;
let trian;
let trianRun = false;
let baloonContent=[];
let bRed = false;
let soundIsPlaying = false;
let isAllBallonsClicked = false;


function preload() {
  joker=loadImage("joker.png");
  background1=loadImage("background.jpg");
  rotatingImage=loadImage("joker2.png");
  balloon=loadImage("ballons.png");
  climbers=loadImage("climbers.png");
  device=loadImage("installtion.png");
  trian=loadImage("train.png");
  device=loadImage("installtion.png");
  background2=loadImage("IMG_4449.jpg");
  for (let i = 0; i < 6; i ++) {
    let picName = "pic" + i+".jpg";
    let pic = loadImage(picName);
    baloonContent.push(pic);
    mySound = loadSound("beat.mp3");
    mySound1 = loadSound("joker.mp3");
  }
}


function setup() {
  let canvas = createCanvas(630, 630);
  trianx=380;
  triany=550;
  //canvas.parent("p5-container");
  currentImage = background1;
  for (let i = 0; i < 7; i ++) {
  }
  for (let i = 0; i < 7; i++) {
    let balloon = new Balloon(random(width), random(height));
    balloons.push(balloon);
  }

  //frameRate(2);  ///////////
}

function draw() {
  background(0, 47, 167);
  console.log(runningImages.length);
  let angle=radians(frameCount);

  if (scene == 1) {
    print("scene1");  /////////

    push();
    translate(width/2, height/2);

    rotate(angle);
    imageMode(CENTER);
    image(currentImage, 0, 0, 880, 880);
    pop();
    image(background1, 0, 0, 650, 650);
    if (bRed == true) {
      print("bRed tint");  ///////////
      tint(255, 0, 0);
    }

    push();
    translate(width/2, height/2);
    rotate(angle);
    imageMode(CENTER);
    image(currentImage, 0, 0, 880, 880);
    pop();

    if (ifBalloon) {
      image(balloon, 0, 0, 350, 300);
    }

    if (trianRun) {
      trianx+=1;
      console.log(trianx);
    }

    if (trianx==810) {
      trianx=-50;
    }

    image(climbers, 0, 280, 440, 360);
    image(joker, 210, 30, 450, 450);

    push();
    imageMode(CENTER);
    image(trian, trianx, triany, 350, 150);
    pop();

    image(device, 0, 420, 260, 210);
  } else if (scene == 2) {
    print("scene2");  /////////

    image(background2, 0, 0, 630, 630);

  
    print("isAllBallonsClicked = " + isAllBallonsClicked);  /////////
    if (isAllBallonsClicked == false) {
      print();  //////////
      checkBallonsClickStatus(balloons);
    } else {
      //tint(0, 255, 0);    // bGreen  
      //tint(255, 255, 255);    // bWhite  
      tint(255, 255, 255, 200);    // bWhite  
    }

    for (let i = 0; i < balloons.length; i++) {
      balloons[i].display();
      balloons[i].float();
    }
  }
  for (let i=0; i<runningImages.length; i++) {
    runningImages[i].display();
    runningImages[i].move();
  }

  for (let i=fireworks.length -1; i>=0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    if (fireworks[i].isDone()) {
      fireworks.splice(i, 1);
      console.log("work");
    }
  }
}

function keyPressed() {
  print("keyPressed");  /////////
  currentImage = joker;
}

function mouseClicked() {
  print("mouseClicked");  /////////

  if (!soundIsPlaying) {
    mySound.play();
    soundIsPlaying = true;

    setTimeout(() => {
      soundIsPlaying = false;
    }
    , mySound.duration() * 1000);
  }

  if (mouseX>280&&mouseX<630&&mouseY>380&&mouseY<630 && scene==1) {
    if (!trianRun) {
      trianRun = true;
    }
  }

  for (let i = 0; i < balloons.length; i++) {
    if (scene == 2 && balloons[i].isbaloon) {
      if (dist(mouseX, mouseY, balloons[i].x, balloons[i].y) <= balloons[i].diameter) {
        balloons[i].isbaloon = false;
      }
    }
    balloons[i].display();
  }

  if (mouseX>200&&mouseX<630&&mouseY>200&&mouseY<630 && scene==1) {
    mySound1.play();
    let runningImage= new RunningImage(rotatingImage, mouseX, mouseY);
    runningImages.push(runningImage);
    if (runningImages.length>=10) {
      bRed = true;
      console.log('red');
    } else {
      bRed = false;
    }
  } else if (mouseX > 0 &&    mouseX < 200 &&    mouseY > 0 &&    mouseY < 200) {
    scene = 2;
    ifBalloon = false;
    explodeFirework();
  }
}


function explodeFirework() {
  let firework = new Firework(mouseX, mouseY);
  fireworks.push(firework);
}


class RunningImage {
  constructor(img, x, y) {
    this.image=img;
    this.x=x;
    this.y=y;
    this.rotationAngle=0;
    this.speed=3;
  }
  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotationAngle);
    imageMode(CENTER);
    image(this.image, 0, 0, 210, 280);
    pop();
  }
  move() {
    this.rotationAngle+=radians(2);
    this.x+=this.speed;
    this.y+=random(-1, 1);
    if (this.x>width+50) {
      let index=runningImages.indexOf(this);
      runningImages.splice(index, 1);
    }
  }
}



class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < 100; i++) {
      let particle = new Particle(this.x, this.y);
      this.particles.push(particle);
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }
  }


  display() {
    for (let particle of this.particles) {
      particle.display();
    }
  }

  isDone() {
    return this.particles.length === 0;
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-5, -1));
    this.gravity = createVector(0, 0.1);
    this.alpha = 255;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
    this.alpha -= 2;
  }

  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    ellipse(this.position.x, this.position.y, 20, 20);
  }
}

class Balloon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = random(150, 230);
    this.color = color(random(255), random(250), random(255));
    this.xSpeed = random(-5, 2);
    this.ySpeed = random(-5, 2);
    this.arrayindex=floor(random(0, 6));
    this.isbaloon = true;
    // this.iamge = img
  }

  display() {
    if (!this.isbaloon) {
      let picture = baloonContent[this.arrayindex];
      console.log(picture);
      image(picture, this.x, this.y);
    } else {
      fill(this.color);
      ellipse(this.x, this.y, this.diameter, this.diameter);
      // image(this.img, this.x, this.y );
    }
  }

  float() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }
}

function checkBallonsClickStatus(balloons) {
  isAllBallonsClicked = false;
  var i = 0;
  for (i = 0; i < balloons.length; i++) {
    if (balloons[i].isbaloon == true) {
      break;
    }
  }
  if (i >= balloons.length) {
    isAllBallonsClicked = true;
  }
}

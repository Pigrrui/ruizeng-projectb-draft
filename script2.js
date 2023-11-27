let rotatingImage;
let runningImages = [];

function preload() {
  rotatingImage = loadImage('/lib/joker2.png');
  joker=loadImage("joker.png")
}

function setup() {
    let canvas3 = createCanvas(630, 630);
    canvas3.parent("p5-container2")
    
}



function draw() {
  
  background(0)
  image(joker,110,120,540,540)
  for (let i = 0; i < runningImages.length; i++) {
    runningImages[i].display();
    runningImages[i].move();

  }

}

function mouseClicked() {

  let runningImage = new RunningImage(rotatingImage, mouseX, mouseY);
  runningImages.push(runningImage);
}


class RunningImage {
  constructor(img, x, y) {
    this.image = img;
    this.x = x;
    this.y = y;
    this.rotationAngle = 0;
    this.speed = 3;
  }

  display() {

    push();
    translate(this.x, this.y);
    rotate(this.rotationAngle);
    imageMode(CENTER);
    image(this.image, 0, 0, 250,350);
    pop();
  }

  move() {
  
    this.rotationAngle += radians(2);


    this.x += this.speed;
    this.y += random(-1, 1);

    if (this.x > width + 50) {
      let index = runningImages.indexOf(this);
      runningImages.splice(index, 1);
    }
  }
}



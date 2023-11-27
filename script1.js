let background1
let rotatingImage
let runningImages=[]
let balloonImage
let fireworks=[]
let currentImage;
let scene = 1;
let ifBalloon = true;

function preload(){
  joker=loadImage("joker.png")
  background1=loadImage("background.jpg")
  rotatingImage=loadImage("joker2.png")
  balloon=loadImage("ballons.png")
  climbers=loadImage("climbers.png")
  device=loadImage("installtion.png")
  train=loadImage("train.png")
 
 
}


function setup() {
  let canvas = createCanvas(630, 630);
  canvas.parent("p5-container")
  currentImage = background1;
}









function draw() {
  background(0,47,167);

  
    push()
  translate(width/2,height/2)
  let angle=radians(frameCount)
  rotate(angle)
  imageMode(CENTER)
  image(currentImage,0,0,880,880)
  pop()
  
  
  
  
  
  
  
  
  

  if(scene==1){
      image(background1,0,0,650,650)
  
    push()
  translate(width/2,height/2)
  let angle=radians(frameCount)
  rotate(angle)
  imageMode(CENTER)
  image(currentImage,0,0,880,880)
  pop()
  if(ifBalloon){
     image(balloon,0,0,350,300)
     }
    
  image(climbers,0,280,440,360)
    image(joker,210,30,450,450)
    image(device,0,420,260,210)
    image(train,280,480,350,150)
   
  }
  for (let i=0; i<runningImages.length;i++){
    runningImages[i].display()
    runningImages[i].move()
    
  }
  
  for(let i=fireworks.length -1;i>=0;i--){
    fireworks[i].update()
    fireworks[i].display()
    if(fireworks[i].isDone()){
      fireworks.splice(i,1)
      console.log("work")
    }
  }
  
   
  

}

function keyPressed(){
  currentImage = joker;
 
  
}

function mouseClicked(){
  
  if(mouseX>200&&mouseX<630&&mouseY>200&&mouseY<630){
    
  let runningImage= new RunningImage(rotatingImage,mouseX,mouseY)
  runningImages.push(runningImage)
  }else if(
  
      mouseX > 0 &&
    mouseX < 200 &&
    mouseY > 0 &&
    mouseY < 200
  
){
    scene = 2;
    ifBalloon = false;
    explodeFirework()
  }
  
}


function explodeFirework() {

  let firework = new Firework(mouseX, mouseY);
  fireworks.push(firework);
}






class RunningImage{
  constructor(img,x,y){
    this.image=img
    this.x=x
    this.y=y
    this.rotationAngle=0
    this.speed=3
  }
  display(){
    push()
    translate(this.x,this.y)
    rotate(this.rotationAngle)
    imageMode(CENTER)
    image(this.image,0,0,210,280)
    pop()
  }
  move(){
    this.rotationAngle+=radians(2)
    this.x+=this.speed
    this.y+=random(-1,1)
    if(this.x>width+50){
      let index=runningImages.indexOf(this)
      runningImages.splice(index,1)
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








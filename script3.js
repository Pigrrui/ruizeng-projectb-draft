let balloonImage
let fireworks=[]



function preload(){

    balloon=loadImage("ballons.png")

   
  }
  

function setup() {
    let canvas3 = createCanvas(630, 630);
    canvas3.parent("p5-container3")
 
}

function draw() {
    background(0);
    image(balloon, 0, 0, 650, 600);

    for (let i = fireworks.length - 1; i >= 0; i--) {
      fireworks[i].update();
      fireworks[i].display();
      if (fireworks[i].isDone()) {
        fireworks.splice(i, 1);
      }
    }
  }
  
  function mousePressed() {
    explodeFirework(mouseX, mouseY);
  }
  
  function explodeFirework(x, y) {
    let firework = new Firework(x, y);
    fireworks.push(firework);
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
      fill(
        this.color.levels[0],
        this.color.levels[1],
        this.color.levels[2],
        this.alpha
      );
      ellipse(this.position.x, this.position.y, 15, 15);
    }
  }
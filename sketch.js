let sytem;
let G;
let v_scale;
let m_scale;
let p_scale;

let sliderM;
let sliderVx;
let sliderVy;
let sliderX;
let sliderY;
let button;
let pause;
let buttonSet;
let sel;
let rand;

let start = false;

let names;

function setup() {
  textAlign(CENTER);
  createCanvas(1000, 1000);
  
  sliderM = createSlider(0, 100, 50);
  sliderM.position(500, 560);
  sliderM.style('width', '80px');
  
  sliderVx = createSlider(-25, 25, 0);
  sliderVx.position(500, 590);
  sliderVx.style('width', '80px');
  
  sliderVy = createSlider(-25, 25, 0);
  sliderVy.position(500, 620);
  sliderVy.style('width', '80px');
  
  sliderX = createSlider(0, 1000, 500);
  sliderX.position(500, 650);
  sliderX.style('width', '80px');
  
  sliderY = createSlider(0, 1000, 500);
  sliderY.position(500, 680);
  sliderY.style('width', '80px');
  
  
  button = createButton('Start');
  button.position(500, 470);
  button.mousePressed(starting);
  
  buttonSet = createButton('Set');
  buttonSet.position(500, 710);
  buttonSet.mousePressed(sett);
  
  pause = createButton('Pause');
  pause.hide();
  pause.position(50, 970);
  pause.mousePressed(starting);
  
  rand = createButton('Random')
  rand.position(500, 740)
  rand.mousePressed(randm);
  
  sel = createSelect();
  sel.position(500, 530);
  
  
  G = 6.67 * Math.pow(10, -11);
  v_scale = 6 * Math.pow(10, 11);
  m_scale = 1
  p_scale = 1
  
  names = ["sun", "earth", "mars", "saturne"];
  let sun = new Planet(40, [0, 0], [600, 500], "yellow", names[0]);
  let earth = new Planet(20, [0, -25], [150, 500], "blue", names[1]);
  let mars = new Planet(10, [0, -8], [300, 500], "orange", names[2]);
  let saturne = new Planet(5, [0, -4], [450, 500], "grey", names[3]);
  system = [sun, earth, mars, saturne];
  
  system.forEach(p=>{sel.option(p.name)});
}


class Planet {
  constructor(m, v, pos, c, name) {
    this.masse = m;
    this.vitesse = v;
    this.pos = pos;

    this.color = c;
    this.name = name;
  }

  update(other_object) {
    var a = [0, 0];
    this.pos[0] += this.vitesse[0] / this.masse;
    this.pos[1] += this.vitesse[1] / this.masse;

    for (let i = 0; i < other_object.length; i++) {
      var o = other_object[i];

      var dx = o.pos[0] - this.pos[0];
      var dy = o.pos[1] - this.pos[1];
      var d = Math.pow((Math.pow(dx, 2) + Math.pow(dy, 2)), 0.5);
      if (d != 0) {
        a[0] += G * o.masse * dx / Math.pow(d, 3);
        a[1] += G * o.masse * dy / Math.pow(d, 3);
        this.vitesse[0] += a[0] * v_scale;
        this.vitesse[1] += a[1] * v_scale;
      }
    }
  }

  draw() {
    let c = color(this.color);
    fill(c);

    ellipse(this.pos[0]*p_scale, this.pos[1]*p_scale, this.masse*m_scale, this.masse*m_scale);
  }
}



function draw() {
  background(220);

  
  if (start == 1){
    system.forEach(p=>{p.update(system); p.draw()});
    button.hide();
    buttonSet.hide();
    sliderM.hide();
    sliderVx.hide();
    sliderVy.hide();
    sliderX.hide();
    sliderY.hide();
    sel.hide();
    pause.show();
  }
  
}

function starting(){
  if (start == false){
    start = true;
  }else{
    start = false;
  }
}


function sett(){
  print(sel.value());
  system[names.indexOf(sel.value())].masse = sliderM.value();
  system[names.indexOf(sel.value())].vitesse = [sliderVx.value(), sliderVy.value()];
  system[names.indexOf(sel.value())].pos = [sliderX.value(), sliderY.value()];
}

function randm(){
  for (let i=0; i<system.length; i++){
    system[i].masse = random(1, 50);
    system[i].vitesse = [random(-1, 1), random(-10, 10)];
    system[i].pos = [random(50, 950), random(400, 600)];
  }

  start = true;
}
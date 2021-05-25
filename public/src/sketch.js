var env
var obs
var backgroundcolor=255
let img
var x=0

function preload(){
	img = loadImage('./assets/clockwise.png')
}


function setup() {
	env = new PendulumEnv()
	createCanvas(env.viewer.width, env.viewer.height);	
	frameRate(env.frame_rate)
	background(backgroundcolor)
	env.reset()
	obs = env.step(0)
}

function sc(sx){
	return sx * 500/4.4
}


function draw() {
	if (keyIsDown(LEFT_ARROW)) {x -= 0.1;}
  	if (keyIsDown(RIGHT_ARROW)) { x += 0.1;}
	//fondo
	fill(backgroundcolor);
  	rect(0, 0, 500, 500);
  	//x = slider.value()
	//console.log(obs)

	let result=env.step(x)

	textSize(12);
	fill(0, 102, 153);
	text(`State:${result.observation}`, 5, 15);
	text(`Costs:${result.costs}`, 5, 35);

	
	
	translate(width / 2+sc(.2)/2, height / 2+sc(.2)/2);
	rotate(env.state.theta -Math.PI/2)
	translate(-sc(.2)/2, -sc(.2)/2);
	fill('rgb(80%,30%,30%)')	
	rect(0, 0, sc(1), sc(.2),sc(.2));
	translate(+sc(.2)/2, +sc(.2)/2);
	fill(0,0,0)
	circle(0,0,sc(0.05))
	
	scale(x,x);
	image(img,-50,-50,100,100)
	
	
}
  

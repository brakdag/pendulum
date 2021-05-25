var env
var sim
var obs
var backgroundcolor=220
let img
var x=0
var result

function preload(){
	img = loadImage('./assets/clockwise.png')
}


function setup() {
	env = new PendulumEnv()
	sim = new Simulation()
	createCanvas(env.viewer.width, env.viewer.height);	
	frameRate(env.frame_rate)
	background(backgroundcolor)
	obs=env.reset()
	
}

function sc(sx){
	return sx * 500/4.4
}


function draw() {
	
	fill(backgroundcolor);
	rect(0, 0, 500, 500);	

	switch(sim.state){
		case 1: 
		text(`Generation:${sim.generation}, Genoma: ${sim.genoma}, Score: ${sim.score}`, 5, 70);
	  	result=sim.step(env,obs)

		case 2: 
			if (sim.state==2)
			{
				if (keyIsDown(LEFT_ARROW)) {x += 2;}
		  		if (keyIsDown(RIGHT_ARROW)) { x -= 2;}
				result=env.step(x)
				if (result.done==1){
				 	env.reset()
					console.log("done")
				}
			}
				obs= result.observation
			
		//fondo
		textSize(12);
		fill(0, 102, 153);
		text(`State:${result.observation}`, 5, 15);
		text(`Costs:${result.costs}`, 5, 35);
		text(`U:${env.last_u}`, 5, 55);
		
		translate(width / 2+sc(.2)/2, height / 2+sc(.2)/2);
		rotate(env.state.theta -Math.PI/2)
		translate(-sc(.2)/2, -sc(.2)/2);
		fill('rgb(80%,30%,30%)')	
		rect(0, 0, sc(1), sc(.2),sc(.2));
		translate(+sc(.2)/2, +sc(.2)/2);
		fill(0,0,0)
		circle(0,0,sc(0.05))	
		scale(env.last_u,abs(env.last_u));
		image(img,-50,-50,100,100)
		x=0; break;
	case 0:       

	fill(backgroundcolor)
	rect(0,0,500,500)
	textSize(12);
	fill(0, 102, 153);
	text(`Press [W] to real time training`, 5, 15);
	text(`Press [M] to test manual Left and Rigth arrows for impulse`, 5, 35);
	text(`Press [F] to fast trainging`, 5, 35);
	text(`Press [T] to test genome`, 5, 35);
	
	break;
	case 4:
		//console.log("case4")
	break;
}

}
  
function keyPressed(){
		console.log(keyCode)
	switch(keyCode){
		case 87: sim.train(env,obs);break;
		case 84: sim.test();break;
		case 77: sim.menu();break
		case 70: sim.fast_train(env,obs);break;
	}
}

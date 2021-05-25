var env
var sim
var obs

function preload(){
	img = loadImage('./assets/clockwise.png')
	fondo = loadImage('./assets/wallpaper.jpg')
	fuente = loadFont('./assets/VCR_OSD_MONO.ttf')
}


function setup() {
	env = new PendulumEnv()
	sim = new Simulation()
	createCanvas(env.viewer.width, env.viewer.height);	
	frameRate(env.frame_rate)
	obs=env.reset()
}

function draw() {
	textFont(fuente)	
	let result
	clear();
	image(fondo,0,0,500,500)
	switch(sim.state){
		case 1: 
			textSize(20);
			fill(0, 0, 0);
			text(`Score:${sim.score.toFixed(2)}, G${sim.generation},B:${sim.genoma}`, 5, 20);

		case 3:
		result=sim.step(env,obs)
		
		case 2: 
			if (sim.state==2)
			{
				let x=0
				if (keyIsDown(LEFT_ARROW)) {x += 2;}
		  		if (keyIsDown(RIGHT_ARROW)) { x -= 2;}
				result=env.step(x)
			}
			obs= result.observation
			env.draw(img,width,height);
			break;
		case 0:       
			textSize(38);
			fill(0, 102, 153);
			text(`PENDULUMENV JS`, 100, 200);
			textSize(18);
			text(`[W] REAL TIME TRAIN`, 25, 240);
			text(`[M] MANUAL:LEFT OR RIGHT ARROW`, 25, 260);
			text(`[F] FAST TRAIN`, 25, 280);
			text(`[T] TEST ELITE GENOME.`, 25, 300);
	
	break;
	case 4:
		result=sim.step(env,obs)
		obs= result.observation
		env.draw(img,width,height)
		//console.log("case4")
	break;
}

}
  
function keyPressed(){
	//console.log(keyCode)
	switch(keyCode){
		case 87: sim.train(env,obs);break;
		case 84: sim.test(env,obs);break;
		case 77: sim.train(env,obs);sim.state=2;break
		case 70: sim.fast_train(env,obs);break;
		case 27: sim.state=0;break;
	}


}

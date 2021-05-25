var y=0
class Simulation{
  constructor(){
    this.brain = {"neurons":[3,3,2],"weights":[2.1956742587496065,3.370956975367319,2.2656710729570606,-1.2769593774309582,-0.7984177341434575,-0.23814160363061565,1.1127768895660428,1.9760920227282759,0.28180848660427693,0.13015892203186308,-0.16347057170997514,0.2756827529589938,-1.2736606602434344,4.219336463181746,0.3119375079747768]}
    this.end_sim=false
    this.initial_score=2000
    this.state = 0
    this.config={networkshape:[3,[3],2],generations:1000,population:23}
    this.Neuvol = new Neuroevolution({network:this.config.networkshape ,population:this.config.population})
    this.gen = this.Neuvol.nextGeneration();
  }

  menu(){
    this.state=0
  }

  train(c,obs){
    this.state=1
    this.generation=0
    this.genoma=0
    this.score=this.initial_score
    this.scores=[]
    c.reset()
  }

  step(c,observation){


    if (this.generation > this.config.generations-1){
      this.end_sim=true
    }

    var r=this.gen[this.genoma].compute(observation)
    this.result=c.step(r[0]>0.5?(r[1]>0.5?2:-2):0)
    if(this.result.done==1)
    {
      this.Neuvol.networkScore(this.gen[this.genoma],this.score);
      this.genoma++
      this.scores.push(this.score)
      if (this.genoma > this.config.population-1){
         this.gen = this.Neuvol.nextGeneration();
        if(y%20==0)console.log({genoma:this.genoma,generation:this.generation,score:Math.max.apply(null,this.scores)})
        this.generation++
        this.genoma=0;
        this.scores=[]
      }

      this.score=this.initial_score
      c.reset();
    }
    else{
      this.score+=this.result.costs
    }

    


    return this.result
  }

    draw(){
      text(`Generation:${sim.generation}, Brain:${sim.genoma}`, 5, 25);
      text(`Score:${sim.score.toFixed(2)}`, 5, 50);
    }

  test(c,ob){
    this.train(c,obs)
    for(var i in this.gen)
    this.gen[i].setSave(this.brain)
    this.state=3
  }

  fast_train(c,obs){
    console.log("fast Train")
    this.train(c,obs)
    this.state=4
    var ob=obs
    y=0
    while(1){
      y++
      let result=this.step(c,ob)
      ob= result.observation
      //if(y%30) c.draw()
      if(this.end_sim) {
        break;
      }

    }
  }

}

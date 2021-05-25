
class Simulation{
  constructor(){
    this.end_sim=false
    this.initial_score=500
    this.state = 0
    this.config={networkshape:[3,[3],2],generations:40,population:200}
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
        console.log({genoma:this.genoma,generation:this.generation,score:Math.max.apply(null,this.scores)})
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

  test(c){
      console.log("test")
    this.state=2
  }

  fast_train(c,obs){
    console.log("fast Train")
    this.train(c,obs)
    this.state=4
    var ob=obs
    while(1){
      let result=this.step(c,ob)
      ob= result.observation
      if(this.end_sim) {
        console.log("end simulation")
        break;
      }

    }
  }

}

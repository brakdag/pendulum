class PendulumEnv {
	constructor(){
		this.viewer = {"width":500,"height":500,}
		this.frame_rate=30
		this.max_speed = 8
        this.max_torque = 2.
        this.dt = .05
        this.g = 10
        this.m = 1.
        this.l = 1.
        this.action_space = {"LOW":-this.max_torque,"HIGH":this.max_torque}
        var high= [1,1,this.max_speed]
        this.observation_space={"LOW":high,"HIGH":high}
	}
	init (cb){
		cb(1)
		return 0
	}
	step(u){
		let th = this.state.theta  // th := theta
		let thdot = this.state.thetadot
        let g = this.g
        let m = this.m
        let l = this.l
        let dt = this.dt
 		
 		u = this.clip(u, -this.max_torque, this.max_torque)
		
		this.last_u = u  //# for rendering
	 	let costs = this.angle_normalize(th) ** 2 + .1 * thdot ** 2 + .001 * (u ** 2)

        let newthdot = thdot + (-3 * g / (2 * l) * Math.sin(th + Math.PI) + 3. / (m * l ** 2) * u) * dt
        let newth = th + newthdot * dt
        newthdot = this.clip(newthdot, -this.max_speed, this.max_speed)

        this.state.theta = newth
        this.state.thetadot = newthdot
        return {observation:this._get_obs(),costs:-costs,end:false}
	}

	reset(){
		this.state = {"theta":Math.random()*2*Math.PI-Math.PI,"thetadot":Math.random()*2-1}
        this.last_u = 0
        return this._get_obs()
	}

	_get_obs(){
        return [Math.cos(this.state.theta), Math.sin(this.state.theta), this.state.thetadot]
	} //OK

	render(){

	}

	close(){

	}

	angle_normalize(x){
		return (((x+Math.PI) % (2*Math.PI)) - Math.PI)
	}
	clip(x,min,max){
		return x<min?min:x>max?max:x
	}
}



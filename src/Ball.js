export default class Ball{
	constructor(){
		this.x = 300;
		this.y = 200;
		this.starting_x = this.x;
		this.starting_y = this.y;
		this.fillStyle = 'orange';
		this.dx = 6;
		this.dy = 0;
		this.ballRadius = 10;

		document.addEventListener('keydown',this.keyDownHandler,false);
		document.addEventListener('keyup',this.keyUpHandler,false);
	}

	keyDownHandler = (e) => {	
		if(e.keyCode == 32){
			this.switchBallDirection();
		}
	}
		
	switchBallDirection(){
		if(this.dx === 0){
			this.dx = 6;
			this.dy = 0;
		}else{
			this.dx = 0;
			this.dy = 6;
		}
	}	
	
	draw(context){
		context.beginPath();
		context.arc(this.starting_x,this.starting_y,this.ballRadius,0,Math.PI*2);
		context.fillStyle = this.fillStyle;
		context.fill();
		context.closePath();
	}
		
	boundaries = (context) => {
		//left to right	
		if(this.x + this.dx > context.canvas.width-this.ballRadius || this.x + this.dx < this. ballRadius) {
			this.dx = -this.dx;
		}
		//up and down
		if(this.y + this.dy > context.canvas.height-this.ballRadius || this.y + this.dy <this. ballRadius) {
			//this.dy = -this.dy;
			this.dy = -this.dy
		}
 	}
	
	move(context){
		context.beginPath();
		context.arc(this.x,this.y,this.ballRadius,0,Math.PI*2);
		context.fillStyle = this.fillStyle;
		context.fill();
		context.closePath();
		this.boundaries(context)
		
		requestAnimationFrame(()=>this.update(context))

	}
	update(context){
		requestAnimationFrame(()=>this.move(context))
		context.clearRect(0,0,context.canvas.width,context.canvas.height)
		this.x += this.dx;
		this.y += this.dy;	
	}	
}


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData } from './redux/GameModule.js';
import { updateView } from './redux/ViewModule.js';

//import Ball from './Ball.js';

class Ball{
	constructor(){
		this.x = 300;
		this.y = 200;
		this.starting_x = this.x;
		this.starting_y = this.y;
		this.dx = 3;
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
			this.dx = 3;
			this.dy = 0;
		}else{
			this.dx = 0;
			this.dy = 6;
		}
	}	
	
	draw(context){
		context.beginPath();
		context.arc(this.starting_x,this.starting_y,this.ballRadius,0,Math.PI*2);
		context.fillStyle = 'orange';
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
			this.ballRadius += 10;
		}
 	}
	
	move(context){
		context.beginPath();
		context.arc(this.x,this.y,this.ballRadius,0,Math.PI*2);
		context.fillStyle = 'orange';
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

class Game extends Component{
	//refers to the canvas itself.
	constructor(props){	
		super(props);
		this.width = 480;
		this.height = 320;
		this.state = {
			context:null
		}
	}

	componentDidMount(){
		const { updateData,updateView } = this.props;
		const { canvas } = this.refs;

		//updateData({context:canvas.getContext('2d')})
		this.setState({context:canvas.getContext('2d')},()=>this.startGame());		
		window.addEventListener('resize',()=>updateView(window.innerWidth));
		
	}
	
	startGame(){
		//draw a ball
		const { context } = this.state;
		let ball = new Ball();
		ball.draw(context);
		ball.update(context);	
	}
		
	canvas = () => {
		return<canvas 
			ref = 'canvas'
			className = 'myCanvas' 
			width = {this.width} 
			height = {this.height}>
		</canvas>
	}
	
	render(){
		return(
			<div>
				<h1>Welcome to the Emoji - Arcade Game </h1>
				{this.canvas()}
			</div>
		)
	}
}



const mapDispatchToProps = (dispatch) => {
	return {
		updateData:(context) => dispatch(updateData(context)),
		updateView:(view) => dispatch(updateView(view))
	}
}

const mapStateToProps = (state) => {
	return{
		constants:state.constants,
		view:state.view
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);


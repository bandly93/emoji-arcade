import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateView } from './redux/viewModule.js';


class Game extends Component{
	constructor(props){
		super(props);	
		this.width = 480;
		this.height = 320;
		this.x = this.width/2;
		this.y = this.height-300;
		this.dx = 2;
		this.dy = 0;
		this.ballRadius = 10;
	}
	componentDidMount(){
		setInterval(this.draw,15)
		const { updateView } = this.props;
		window.addEventListener('resize',()=>updateView(window.innerWidth));
		document.addEventListener('keydown',this.keyDownHandler,false);
		document.addEventListener('keyup',this.keyUpHandler,false);
	}

	keyDownHandler = (e) => {	
		if(e.keyCode == 32){
			this.switchBallDirection();
		}
	}
	
	canvas = () => {
		return<canvas 
			ref = 'canvas'
			className = 'myCanvas' 
			width = {this.width} 
			height = {this.height}>
		</canvas>
	}

	switchBallDirection = () => {
		if(this.dx === 0){
			this.dx = 2;
			this.dy = 0;
		}else{
			this.dx = 0;
			this.dy = 2;
		}
	}	


	boundaries = (canvas) => {
		const { ballRadius } = this;	
		if(this.x + this.dx > canvas.width-ballRadius || this.x + this.dx < ballRadius) {
			this.dx = -this.dx;
			this.ballRadius += 2;
		}
		if(this.y + this.dy > canvas.height-ballRadius || this.y + this.dy < ballRadius) {
			this.dy = -this.dy;
			this.ballRadius += 2;
		}
 	}
	
	draw = () => {
		const { canvas } = this.refs;
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.boundaries(canvas);	
					
		this.x += this.dx;
		this.y += this.dy;
		this.drawBall(canvas);
	}

	drawBall = (canvas) => {
		let ctx = canvas.getContext('2d');	
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.ballRadius,0,Math.PI*2);
		ctx.fillStyle = 'orange';
		ctx.fill();
		ctx.closePath();
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
		updateView:(screenSize) => dispatch(updateView(screenSize)) 	
	}
}

const mapStateToProps = (state) => {
	return{
		view:state.view
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);



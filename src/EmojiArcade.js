import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateView } from './redux/viewModule.js';


class Game extends Component{
	constructor(props){
		super(props);
		const { updateView } = this.props;
		window.addEventListener('resize',()=>updateView(window.innerWidth));
		this.width = 960;
		this.height = 640;
		this.x = this.width/2;
		this.y = this.height-150;
		this.dx = 2;
		this.dy = 0;
		this.ballRadius = 10;

	}
	
	canvas = () => {
		return<canvas 
			ref = 'canvas'
			className = 'myCanvas' 
			width = {this.width} 
			height = {this.height}>
		</canvas>
	}
	
	draw = () => {
		const { canvas } = this.refs;
		var ctx = canvas.getContext('2d');
		let { ballRadius } = this;
		ctx.clearRect(0, 0, canvas.width, canvas.height);


		if(this.x + this.dx > canvas.width-ballRadius || this.x + this.dx < ballRadius) {
			this.dx = -this.dx;
		}
		if(this.y + this.dy > canvas.height-ballRadius || this.y + this.dy < ballRadius) {
			this.dy = -this.dy;
		}
			
		this.x += this.dx;
		this.y += this.dy;	
		this.drawBall();
	}


	
	drawBall = () => {
		const { canvas } = this.refs;
		let ctx = canvas.getContext('2d');
		
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.ballRadius,0,Math.PI*2);
		ctx.fillStyle = 'orange';
		ctx.fill();
		ctx.closePath();
	}
	
	render(){
		const { canvas } = this.refs	
			
		canvas?setInterval(this.draw,15):null
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



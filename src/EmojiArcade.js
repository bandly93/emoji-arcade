import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { updateData } from './redux/GameModule.js';
import { updateView } from './redux/ViewModule.js';
import Ball from './Ball.js';
import Board from './Board.js';

class Game extends Component{
	//refers to the canvas itself.
	constructor(props){	
		super(props);
		this.width = 480;
		this.height = 320;
		this.state = {
			context:null,
		}
		this.pegs = [];
		this.currentBall = {};
	}

	componentDidMount(){
		const { updateData,updateView } = this.props;
		const { canvas } = this.refs;
		this.setState({context:canvas.getContext('2d')},()=>this.startGame());		
		window.addEventListener('resize',()=>updateView(window.innerWidth));	
	}
	
	createBallAndDraw = (args) => {
		const { context } = this.state;
		let ball = new Ball({context,...args})
		ball.draw();	
		ball.update();
		this.currentBall = ball.Position;
		console.log(this.currentBall);
	}
	
	createBoardAndDraw = (args) => {
		const { context } = this.state;
		let board = new Board({context,...args});
		board.draw();
		this.pegs = board.pegs;
		board.update();		
	}
	
	update(){
		const { x,y,dx,dy }= this.currentBall;
		const { context } = this.state;
		const { width,height } = context.canvas;
		//create new ball and board on each frame;
		context.clearRect(0,0,context.canvas.width,context.canvas.height);	
		this.createBoardAndDraw({context});
		this.createBallAndDraw({x,y,dx,dy});
		this.intersect();	
		requestAnimationFrame(()=>this.update());	
	}	

	intersect(){
		let length = this.pegs.length;
		let ball_x = this.currentBall.x;
		let ball_y = this.currentBall.y;

		for ( let i = 0; i < length; i++){
			let peg_x = this.pegs[i].x;
			let peg_y = this.pegs[i].y;
			let dx = ball_x - peg_x;
			let dy = ball_y - peg_y;
			let distance = Math.sqrt(dx*dx + dy*dy);	
			if(distance < 13){
				console.log('collision between ball and peg', i);

			}	
		}
	}
	
	startGame(){
		//create starting ball and build board;
		this.createBallAndDraw();
		this.createBoardAndDraw();
		this.update();
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
			<Fragment>
				<h1>Welcome to the Emoji - Arcade Game </h1>
				{this.canvas()}
			</Fragment>
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


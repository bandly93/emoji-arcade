import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import { updateData } from './redux/GameModule.js';
import { updateView } from './redux/ViewModule.js';
import Ball from './Ball.js';
import Board from './Board.js';
import { drawTextObj } from './utils/drawUtils.js';

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
		this.currentBallLocation = {};
		this.ball = {};
	}

	componentDidMount(){
		const { updateData,updateView } = this.props;
		const { canvas } = this.refs;
		this.setState({context:canvas.getContext('2d')},()=>this.startGame());		
		window.addEventListener('resize',()=>updateView(window.innerWidth));
		document.addEventListener('keydown', this.changePath.bind(this),false);
	}

	changePath(){	
		this.ball.dropBall();
		this.currentBallLocation = this.ball.Position;
	}
	
	createBallAndDraw = (args) => {
		const { context } = this.state;
		this.ball = new Ball({context,...args});
		this.ball.update();	
		this.currentBallLocation = this.ball.Position;	
	}
	
	createBoardAndDraw = (args) => {
		const { context } = this.state;
		let board = new Board({context,...args});
		board.draw();	
		this.pegs = board.pegs;
	}
	
	update(){
		const { x,y,dx,dy } = this.currentBallLocation;
		const { context } = this.state;
		const { width,height } = context.canvas;
		//create new ball and board on each frame;
		context.clearRect(0,0,width,height);	
		this.createBoardAndDraw({context});
		this.createBallAndDraw({x,y,dx,dy});
		this.intersect();
		this.display();
		requestAnimationFrame(()=>this.update());		
	}	

	intersect(){
		let length = this.pegs.length;
		let ball_x = this.currentBallLocation.x;
		let ball_y = this.currentBallLocation.y;

		for ( let i = 0; i < length; i++){
			let peg_x = this.pegs[i].x;
			let peg_y = this.pegs[i].y;
			let dx = ball_x - peg_x;
			let dy = ball_y - peg_y;
			let distance = Math.sqrt(dx*dx + dy*dy);	
			if(distance < 13){
				//console.log('collision between ball and peg', i);
			}	
		}
	}
	
	startGame(){
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

	display = () => {
		const { context } = this.state;
		const { x,y,dx,dy } = this.currentBallLocation;
		let text = 'x: ' + x + ' y: ' + y + ' dx: ' + dx + ' dy: ' + dy;	
		drawTextObj({context,text});	
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


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
			context:null
		}
	}
	
	createBallAndDraw = (args) => {
		const { context } = this.state
		let ball = new Ball({context,...args})
		ball.draw();
		ball.update();
	}
	
	createBoardAndDraw = (args) => {
		const { context } = this.state;
		let board = new Board({context,...args});
		board.draw();
	}

	componentDidMount(){
		const { updateData,updateView } = this.props;
		const { canvas } = this.refs;
		this.setState({context:canvas.getContext('2d')},()=>this.startGame());		
		window.addEventListener('resize',()=>updateView(window.innerWidth));	
	}

	startGame(){
		this.createBallAndDraw({x:50,y:30,fillStyle:'blue'});
		this.createBoardAndDraw();	
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


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData } from './redux/GameModule.js';
import { updateView } from './redux/ViewModule.js';
import Ball from './Ball.js';

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
		
		for(let i = 0; i< 6; i++){
			let ball = new Ball();

			ball.x = ball.x+ (i*17)
			ball.y = ball.y + (i * 25 )
			i % 2 ? ball.fillStyle = 'green': ball.fillStyle = 'orange'
			
			func(ball)
		}	
			
		
		
		function func(ball){	
			ball.draw(context)
			ball.update(context);
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


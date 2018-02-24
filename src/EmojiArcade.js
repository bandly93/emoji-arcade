import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateView } from './redux/viewModule.js';


class Game extends Component{
	
	componentDidMount(){
		const { updateView } = this.props;
		window.addEventListener('resize',()=>updateView(window.innerWidth));
	}
		
	canvas = () => {
		const { screenSize } = this.props.view;
	
		return<canvas 
			id = 'myCanvas'
			className = 'myCanvas' 
			width = {(screenSize*.75)} 
			height = {(((screenSize/16)*9)*.75)}>
		</canvas>
	}
	
	render(){
		const { screenSize } = this.props.view;
	
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



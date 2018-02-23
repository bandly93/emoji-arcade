import React , { Component} from 'react';
import ReactDOM from 'react-dom';

class Home extends Component{
	render(){
		return(
			<div>
				<h1>Hello</h1>
			</div>
		)
	}
}

ReactDOM.render(
	<Home />,
	document.getElementById('app')
);

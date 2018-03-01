import React , { Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers,compose,createStore } from 'redux';
import Game from '../EmojiArcade.js';
import constants from '../redux/GameModule.js';
import view from '../redux/ViewModule.js';

let reducers = combineReducers({
	constants,
	view
})

let store = createStore(reducers,compose(window.__REDUX_DEVTOOLS_EXTENSION__()))


ReactDOM.render(
	<Provider store = {store}>
		<Game />
	</Provider>,
	document.getElementById('app')
);

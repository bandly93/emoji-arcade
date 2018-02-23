import React , { Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers,compose,createStore } from 'redux';
import Game from './EmojiArcade.js';
import {randomReducer}from './redux/GameModule.js';

let reducers = combineReducers({
	randomReducer
})

let store = createStore(reducers,compose(window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()))

ReactDOM.render(
	<Provider store = {store}>
		<Game />
	</Provider>,
	document.getElementById('app')
);

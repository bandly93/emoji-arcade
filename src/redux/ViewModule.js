export const UPDATE_VIEW = 'UPDATE_VIEW';

let initialState = {
	screenSize : window.innerWidth
}

export const updateView = (screenSize) => {
	return{
		type:UPDATE_VIEW,
		screenSize
	}
}

export const viewReducer = (state = initialState,action) => {
	switch(action.type){
		case UPDATE_VIEW:
			return {...state,screenSize:action.screenSize}
		default:
			return state
	}
}

export default viewReducer;

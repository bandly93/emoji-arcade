export const UPDATE_DATA = 'UPDATE_DATA';

export const updateData = (context) => {
	return{
		type:UPDATE_DATA,
		context
	}
}

export const constantsReducer = (state = initialState, action) => {
	switch(action.type){
		case UPDATE_DATA:
			return {...state,...action.context};

		default:
			return state;
	}
}


let initialState = {
	context:null
}



export default constantsReducer;

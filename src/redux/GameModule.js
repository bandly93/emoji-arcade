let initialState = {
	count:0
}

export const UPDATE_DATA = 'UPDATE_DATA';

export const updateData = (data) => {
	return{
		type:UPDATE_DATA,
		data
	}
}

export const randomReducer = (state = initialState, action) => {
	switch(action.type){
		case UPDATE_DATA:
			return {...state,...action.data};
		default:
			return state;
	}
}

export default randomReducer;

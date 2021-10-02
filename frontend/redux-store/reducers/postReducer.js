import * as types from '../types';

const initialState = {
	posts1: [],
	post: {},
	loading: false,
	error: null,
};

export const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_POSTS:
			return {
				...state,
				posts1: action.payload,
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};

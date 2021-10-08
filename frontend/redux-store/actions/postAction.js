import * as types from '../types';
import postServices from '../../services/posts';

export const fetchPosts = () => async (dispatch) => {
	const response = await postServices.getAll();
	const posts = await response.data;
	dispatch({
		type: types.GET_POSTS,
		// payload: ['1st post', '2nd post', '3rd post'],
		payload: posts,
	});
};

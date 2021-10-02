import http from '../http-common';

const getAll = () => {
	return http.get('/posts');
};

const get = (id) => {
	return http.get(`/posts/${id}`);
};

const createPost = (values) => {
	return http.post('/posts', values);
};

const editPost = (id, values) => {
	return http.patch(`/posts/${id}`, values);
};

const deletePost = (id) => {
	return http.delete(`/posts/${id}`);
};

const deleteAll = () => {
	return http.delete(`/posts`);
};

const findByTitle = (id) => {
	return http.get(`/posts?title=${title}`);
};

export default {
	getAll,
	createPost,
	editPost,
	deletePost,
	deleteAll,
	get,
	findByTitle,
};

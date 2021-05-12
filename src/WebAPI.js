import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

export const getPosts = () => {
	return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((response) => response.json());
};
export const getPost = (id) => {
	return fetch(`${BASE_URL}/posts/${id}`).then((response) => response.json());
};
export const login = (username, password) => {
	return fetch(`${BASE_URL}/login`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			username: username,
			password: password
		})
	}).then((res) => res.json());
};
export const getMe = () => {
	const token = getAuthToken();
	return fetch(`${BASE_URL}/me`, {
		headers: {
			authorization: `Bearer ${token}`
		}
	}).then((res) => res.json());
};
export const newPost = (title, body) => {
	const token = getAuthToken();
	return fetch(`${BASE_URL}/posts`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			title,
			body
		})
	}).then((res) => res.json());
};
export const deletePost = (id) => {
	const token = getAuthToken();
	return fetch(`${BASE_URL}/posts/${id}`, {
		method: 'DELETE',
		headers: {
			// 'content-type': 'application/json',
			authorization: `Bearer ${token}`
		}
	}).then((res) => res.json());
};

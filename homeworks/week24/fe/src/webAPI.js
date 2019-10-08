import axios from 'axios';

// url parameters
const baseUrl = 'https://blog-api.yakim.tw/posts';
const sort = '_sort=id';
const sortASC = sort + '&_order=asc';
const sortDESC = sort + '&_order=desc';

const LIMIT_NUM = 5;
const limit = '_limit=' + LIMIT_NUM;


// action creators
export const getAllPosts = () => axios.get(`${baseUrl}?${sortDESC}`)

export const getLimitPosts = () => axios.get(`${baseUrl}?${sortASC}&${limit}`)

export const getPost = id => axios.get(`${baseUrl}/${id}`)

export const addPost = post => axios.post(baseUrl, post)

export const deletePost = id => axios.delete(`${baseUrl}/${id}`)

export const updatePost = (id, post) => axios.put(`${baseUrl}/${id}`, post)
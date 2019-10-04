import axios from 'axios';

// action types
const GET_ALL_POSTS = 'GET_ALL_POSTS'
const GET_LIMIT_POSTS = 'GET_LIMIT_POSTS'
const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const GET_POST = 'GET_POST'
const UPDATE_POST = 'UPDATE_POST'

// url parameters
const baseUrl = 'http://blog-api.yakim.tw/posts';
const sort = '_sort=id';
const sortASC = sort + '&_order=asc';
const sortDESC = sort + '&_order=desc';

const LIMIT_NUM = 5;
const limit = '_limit=' + LIMIT_NUM;

// reducer
export default function (state, action) {
  if (!state) {
    state = {
      postList: [],
      post: {}
    }
  }
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        postList: action.payload.data
      }

    case GET_LIMIT_POSTS:
      return {
        ...state,
        postList: action.payload.data
      }

    case GET_POST:
      return {
        ...state,
        post: action.payload.data
      }

    default:
      return state
  }
}

// action creators
export const getAllPosts = () => {
  return {
    type: GET_ALL_POSTS,
    payload: axios.get(`${baseUrl}?${sortDESC}`)
  }
}

export const getLimitPosts = () => {
  return {
    type: GET_LIMIT_POSTS,
    payload: axios.get(`${baseUrl}?${sortASC}&${limit}`)
  }
}

export const getPost = (id) => {
  return {
    type: GET_POST,
    payload: axios.get(`${baseUrl}/${id}`)
  }
}

export const addPost = (post, history) => {
  return {
    type: ADD_POST,
    payload: axios({
      method: 'POST',
      url: baseUrl,
      data: post,
    }).then(() => history.push('/posts'))
  }
}

export const deletePost = (id, history) => {
  return {
    type: DELETE_POST,
    payload: axios({
      method: 'DELETE',
      url: `${baseUrl}/${id}`,
    }).then(() => history.push('/posts'))
  }
}

export const updatePost = (id, post, history) => {
  return {
    type: UPDATE_POST,
    payload: axios({
      method: 'PUT',
      url: `${baseUrl}/${id}`,
      data: post,
    }).then(() => history.push(`/posts/${id}`))
  }
}


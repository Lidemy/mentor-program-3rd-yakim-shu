import axios from 'axios';

// action types
const GET_ALL_POSTS = 'GET_ALL_POSTS'
const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const GET_POST = 'GET_POST'
const UPDATE_POST = 'UPDATE_POST'

const baseUrl = 'http://blog-api.yakim.tw/posts';

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
    payload: axios.get(`${baseUrl}?_sort=id&_order=desc`)
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


import axios from 'axios';

// action types
const GET_ALL_POSTS = 'GET_ALL_POSTS'
const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const GET_POST = 'GET_POST'

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

    case ADD_POST:
      return {
        posts: [...state.posts, action.post]
      }

    case DELETE_POST:
      return {
        posts: [
          ...state.posts.slice(0, action.postIndex),
          ...state.posts.slice(action.postIndex + 1)
        ]
      }
    default:
      return state
  }
}

// action creators
export const getAllPosts = () => {
  return {
    type: GET_ALL_POSTS,
    payload: axios.get('http://blog-api.yakim.tw/posts')
  }
}

export const getPost = (id) => {
  return {
    type: GET_POST,
    payload: axios.get(`http://blog-api.yakim.tw/posts/${id}`)
  }
}

export const addPost = (post) => {
  return { type: ADD_POST, post }
}

export const deletePost = (postIndex) => {
  return { type: DELETE_POST, postIndex }
}
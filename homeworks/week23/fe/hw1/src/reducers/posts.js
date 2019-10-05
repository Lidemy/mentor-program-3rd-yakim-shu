import axios from 'axios';

// action types
const GET_ALL_POSTS = 'GET_ALL_POSTS'
const GET_LIMIT_POSTS = 'GET_LIMIT_POSTS'
const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const GET_POST = 'GET_POST'
const UPDATE_POST = 'UPDATE_POST'


const initState = {
  postList: [],
  post: {}
}

// reducer
export default function postsReducer(state = initState, action) {
  switch (action.type) {

    case GET_ALL_POSTS:
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


// url parameters
const baseUrl = 'https://blog-api.yakim.tw/posts';
const sort = '_sort=id';
const sortASC = sort + '&_order=asc';
const sortDESC = sort + '&_order=desc';

const LIMIT_NUM = 5;
const limit = '_limit=' + LIMIT_NUM;


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

export const addPost = (post, history, showMsg) => {
  return {
    type: ADD_POST,
    payload: axios.post(baseUrl, post)
      .then(() => {
        showMsg('addPost', true);
        history.push('/posts')
      })
      .catch((err) => {
        console.log(err);
        showMsg('addPost', false);
      })
  }
}

export const deletePost = (id, history, showMsg) => {
  return {
    type: DELETE_POST,
    payload: axios.delete(`${baseUrl}/${id}`)
      .then(() => {
        showMsg('deletePost', true);
        history.push('/posts');
      })
      .catch((err) => {
        console.log(err);
        showMsg('deletePost', false);
      })
  }
}

export const updatePost = (id, post, history, showMsg) => {
  return {
    type: UPDATE_POST,
    payload: axios.put(`${baseUrl}/${id}`, post)
      .then(() => {
        showMsg('updatePost', true);
        history.push(`/posts/${id}`)
      })
      .catch((err) => {
        console.log(err);
        showMsg('updatePost', false);
      })
  }
}


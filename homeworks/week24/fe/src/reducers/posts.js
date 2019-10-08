import { ActionTypes } from "./../actions";

const initState = {
  postList: [],
  post: {},
  isLoading: false,
  isLoadingAddPost: false,
  isLoadingGetPost: false,
  isLoadingDeletePost: false,
  isLoadingUpdatePost: false,
  addPostError: null,
}

// reducer
export default function postsReducer(state = initState, action) {
  switch (action.type) {

    /* get all ---------- */
    case `${ActionTypes.GET_ALL_POSTS}_PENDING`:
    case `${ActionTypes.GET_LIMIT_POSTS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      }

    case `${ActionTypes.GET_ALL_POSTS}_FULFILLED`:
    case `${ActionTypes.GET_LIMIT_POSTS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        postList: action.payload.data
      }

    /* get ---------- */
    case `${ActionTypes.GET_POST}_PENDING`:
      return {
        ...state,
        isLoadingGetPost: true,
      }

    case `${ActionTypes.GET_POST}_FULFILLED`:
      return {
        ...state,
        isLoadingGetPost: false,
        post: action.payload.data
      }


    /* add ---------- */
    case `${ActionTypes.ADD_POST}_PENDING`:
      return {
        ...state,
        isLoadingAddPost: true,
      }

    case `${ActionTypes.ADD_POST}_FULFILLED`:
      return {
        ...state,
        isLoadingAddPost: false,
      }

    /* delete ---------- */
    case `${ActionTypes.DELETE_POST}_PENDING`:
      return {
        ...state,
        isLoadingDeletePost: true,
      }

    case `${ActionTypes.DELETE_POST}_FULFILLED`:
      return {
        ...state,
        isLoadingDeletePost: false,
      }

    /* update ---------- */
    case `${ActionTypes.UPDATE_POST}_PENDING`:
      return {
        ...state,
        isLoadingUpdatePost: true,
      }

    case `${ActionTypes.UPDATE_POST}_FULFILLED`:
      return {
        ...state,
        isLoadingUpdatePost: false,
      }


    default:
      return state
  }
}

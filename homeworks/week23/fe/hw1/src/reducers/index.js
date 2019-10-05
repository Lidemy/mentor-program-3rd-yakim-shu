import { combineReducers } from "redux";
import postsReducer from "./posts";
import msgReducer from "./msg";

const reducer = combineReducers({
  posts: postsReducer,
  msg: msgReducer
});

export default reducer;
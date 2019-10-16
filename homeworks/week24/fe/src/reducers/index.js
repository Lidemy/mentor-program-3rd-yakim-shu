import { combineReducers } from "redux";
import postsReducer from "./posts";
import msgReducer from "./msg";
import categoryReducer from "./category";

const reducer = combineReducers({
  posts: postsReducer,
  msg: msgReducer,
  category: categoryReducer,
});

export default reducer;
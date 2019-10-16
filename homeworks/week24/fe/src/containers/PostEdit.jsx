import React from 'react';
import { connect } from 'react-redux';
import PostEdit from './../components/post-edit/PostEdit';
import { Actions } from './../actions';

const PostEditContainer = props => (<PostEdit {...props} />);

const mapStateToProps = ({ posts, category }) => ({
  post: posts.post,
  isLoadingAddPost: posts.isLoadingAddPost,
  isLoadingUpdatePost: posts.isLoadingUpdatePost,
  addPostError: posts.addPostError,
  upadatePostError: posts.updatePostError,
  categoryList: category,
});
const mapDispatchToProps = {
  addPost: Actions.ADD_POST,
  getPost: Actions.GET_POST,
  updatePost: Actions.UPDATE_POST,
  showMsg: Actions.SHOW_MSG
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditContainer)
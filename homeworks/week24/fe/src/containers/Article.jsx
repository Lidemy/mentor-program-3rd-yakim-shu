import React from 'react';
import { connect } from 'react-redux';
import Article from './../components/article/Article';
import { Actions } from './../actions';

const ArticleContainer = props => (<Article {...props} />);

const mapStateToProps = ({ posts }) => ({
  post: posts.post,
  isLoadingDeletePost: posts.isLoadingDeletePost,
  isLoadingGetPost: posts.isLoadingGetPost,
});
const mapDispatchToProps = {
  getPost: Actions.GET_POST,
  deletePost: Actions.DELETE_POST,
  showMsg: Actions.SHOW_MSG,
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer)
import React from 'react';
import { connect } from 'react-redux';
import PostList from './../components/post-list/PostList';
import { Actions } from './../actions';

const PostListContainer = props => (<PostList {...props} />);

const mapStateToProps = ({ posts }) => ({
  postList: posts.postList,
  isLoading: posts.isLoading,
});
const mapDispatchToProps = {
  getAllPosts: Actions.GET_ALL_POSTS
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
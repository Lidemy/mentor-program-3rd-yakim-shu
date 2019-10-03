import React from 'react';
import { connect } from 'react-redux';
import PostList from './../components/post-list/PostList';
import { getAllPosts } from './../reducers/post-list';


const PostListContainer = props => (<PostList {...props} />);

const mapStateToProps = (state) => {
  return {
    postList: state.postList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPosts: () => {
      dispatch(getAllPosts())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListContainer)
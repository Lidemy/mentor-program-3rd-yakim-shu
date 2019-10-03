import React from 'react';
import { connect } from 'react-redux';
import Article from './../components/article/Article';
import { getPost } from './../reducers/post-list';


const ArticleContainer = props => (<Article {...props} />);

const mapStateToProps = (state) => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (id) => {
      dispatch(getPost(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleContainer)
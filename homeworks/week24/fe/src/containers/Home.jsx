import React from 'react';
import { connect } from 'react-redux';
import Home from './../components/home/Home';
import { Actions } from './../actions';

const HomeContainer = props => (<Home {...props} />);

const mapStateToProps = ({ posts }) => ({
  postList: posts.postList,
  isLoading: posts.isLoading,
});
const mapDispatchToProps = {
  getLimitPosts: Actions.GET_LIMIT_POSTS
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
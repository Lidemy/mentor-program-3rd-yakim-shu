import React from 'react';
import { connect } from 'react-redux';
import Home from './../components/home/Home';
import { getLimitPosts } from '../reducers/posts';

const HomeContainer = props => (<Home {...props} />);

const mapStateToProps = ({ posts }) => ({ postList: posts.postList });
const mapDispatchToProps = { getLimitPosts }


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
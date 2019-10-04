import React from 'react';
import { connect } from 'react-redux';
import Home from './../components/home/Home';
import { getLimitPosts } from '../reducers/post';

const HomeContainer = props => (<Home {...props} />);

const mapStateToProps = ({ postList }) => { return { postList } };
const mapDispatchToProps = { getLimitPosts }

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
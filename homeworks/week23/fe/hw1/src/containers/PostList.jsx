import React from 'react';
import { connect } from 'react-redux';
import PostList from './../components/post-list/PostList';
import { getAllPosts } from '../reducers/posts';

const PostListContainer = props => (<PostList {...props} />);

const mapStateToProps = ({ posts }) => ({ postList: posts.postList });
const mapDispatchToProps = { getAllPosts };

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
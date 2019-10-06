import React from 'react';
import { connect } from 'react-redux';
import PostEdit from './../components/post-edit/PostEdit';
import { addPost, getPost, updatePost } from '../reducers/posts';
import { showMsg } from '../reducers/msg';

const PostEditContainer = props => (<PostEdit {...props} />);

const mapStateToProps = ({ posts }) => ({ post: posts.post });
const mapDispatchToProps = { addPost, getPost, updatePost, showMsg }

export default connect(mapStateToProps, mapDispatchToProps)(PostEditContainer)
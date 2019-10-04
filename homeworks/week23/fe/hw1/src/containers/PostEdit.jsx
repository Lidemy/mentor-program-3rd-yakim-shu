import React from 'react';
import { connect } from 'react-redux';
import PostEdit from './../components/post-edit/PostEdit';
import { addPost, getPost, updatePost } from '../reducers/post';

const PostEditContainer = props => (<PostEdit {...props} />);

const mapStateToProps = ({ post }) => { return { post } };
const mapDispatchToProps = { addPost, getPost, updatePost }

export default connect(mapStateToProps, mapDispatchToProps)(PostEditContainer)
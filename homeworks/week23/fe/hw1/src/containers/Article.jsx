import React from 'react';
import { connect } from 'react-redux';
import Article from './../components/article/Article';
import { getPost, deletePost } from '../reducers/posts';
import { showMsg } from '../reducers/msg';

const ArticleContainer = props => (<Article {...props} />);

const mapStateToProps = ({ posts }) => ({ post: posts.post });
const mapDispatchToProps = { getPost, deletePost, showMsg }

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer)
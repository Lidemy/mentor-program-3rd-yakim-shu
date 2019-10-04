import React from 'react';
import { connect } from 'react-redux';
import Article from './../components/article/Article';
import { getPost, deletePost } from '../reducers/post';

const ArticleContainer = props => (<Article {...props} />);

const mapStateToProps = ({ post }) => { return { post } };
const mapDispatchToProps = { getPost, deletePost }

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContainer)
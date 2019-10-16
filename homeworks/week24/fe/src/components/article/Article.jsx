import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner'
import { getDate } from './../../utils';
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";


const ArticleInfo = ({ post }) => (
  <div className="article__info">
    <p className="article__author">{post.author}</p>
    <p className="article__date">{getDate(post.createdAt)}</p>
  </div>
)

const ArticleCategory = ({ post }) => (
  <p className="article__category">
    category:
    <Link to={`/category/${post.category}`}>{post.category}</Link>
  </p>
)


const ArticleImg = ({ post }) => (
  !post.pic ? null : (
    <div className="pic article__cover">
      <img src={post.pic} alt="" />
    </div>
  )
)

const ArticleBody = ({ post }) => (
  <div className="article__body">
    <ReactMarkdown
      source={post.body}
      renderers={{ code: CodeBlock }}
    />
  </div>
)

const ArticleOperate = ({ post, handleDelete }) => (
  <div className="article__operate">
    <Link className="btn btn-back active" to='/posts'>Back</Link>
    <Link className="btn btn-edit" to={`/edit-post/${post.id}`}>Edit</Link>
    <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
  </div>
)

class Article extends Component {
  constructor(props) {
    super(props);
    this.postId = this.props.match.params.id;
  }

  componentDidMount() {
    const { getPost } = this.props;
    getPost(this.postId);
  }

  componentDidUpdate(prevProps) {
    const {
      history,
      isLoadingDeletePost,
      showMsg,
      deletePostError,
      getPost } = this.props;

    const presentId = this.props.match.params.id;

    if (Number(presentId) !== prevProps.post.id) {
      getPost(presentId);
      return;
    }

    if (prevProps.isLoadingDeletePost !== isLoadingDeletePost && !isLoadingDeletePost) {
      if (deletePostError) {
        showMsg('deletePost', false);
        return;
      }

      showMsg('deletePost', true);
      history.push('/posts');
    }
  }

  handleDelete = () => {
    const { post, deletePost, history, showMsg } = this.props;
    deletePost(post.id, history, showMsg)
  }

  render() {
    const { post, isLoadingGetPost } = this.props;

    if (isLoadingGetPost) return <Spinner />;
    return (
      <section className="article">
        <h2 className="article__title">{post.title}</h2>
        <ArticleCategory {...this.props} />
        <ArticleImg {...this.props} />
        <ArticleBody {...this.props} />
        <ArticleInfo {...this.props} />
        <ArticleOperate {...this.props} handleDelete={this.handleDelete} />
      </section>
    )
  }
};

export default Article;

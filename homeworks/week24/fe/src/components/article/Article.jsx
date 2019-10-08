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

const ArticleImg = ({ post }) => (
  !post.pic ? null : (
    <div className="pic article__cover">
      <img src={post.pic} alt="" />
    </div>
  )
)

const ArticleOperate = ({ post, handleDelete }) => (
  <div className="article__operate">
    <Link className="btn btn-back active" to='/posts'>Back</Link>
    <Link className="btn btn-edit" to={`/edit-post/${post.id}`}>Edit</Link>
    <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
  </div>
)

const ArticleBody = ({ post }) => (
  <div className="article__body">
    <ReactMarkdown
      source={post.body}
      renderers={{ code: CodeBlock }}
    />
  </div>
)

class Article extends Component {
  state = {
    isLoaded: false
  }

  componentWillMount() {
    const { getPost } = this.props;
    const postId = this.props.match.params.id;
    getPost(postId);
  }

  componentDidUpdate(prevProps) {
    const { history, isLoadingDeletePost, showMsg } = this.props;
    if (prevProps.isLoadingDeletePost !== isLoadingDeletePost && !isLoadingDeletePost) {
      // if (addPostError) {
      //   showMsg('addPost', false);
      // }

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
    return (
      isLoadingGetPost ? <Spinner /> :
        (
          <section className="article">
            <h2 className="article__title">{post.title
            }</h2 >
            <ArticleImg {...this.props} />
            <ArticleBody {...this.props} />
            <ArticleInfo {...this.props} />
            <ArticleOperate {...this.props} handleDelete={this.handleDelete} />
          </section >
        )
    )
  }
};

export default Article;

import React, { Component } from 'react';
import Spinner from '../spinner/Spinner';
import { withRouter } from 'react-router-dom';
import { getDate, getYear } from './../../utils';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => (
  <Link to={`/posts/${post.id}`} className='post'>
    <p className="post__date">
      <span>{getDate(post.createdAt)}</span>
      {getYear(post.createdAt)}
    </p>
    <h4 className="post__title">{post.title}</h4>
    <p className="post__description">{post.body}</p>
  </Link>
);

const PostEmptyStatus = () => (
  <p className="post__status">
    沒有文章
    <span role="img" aria-label="Nauseated Face"> 🤢</span>
  </p>
);

const PostSection = ({ category, postList }) => (
  <>
    <h2 className="post-list__title">{category ? category : '全部文章'}</h2>
    <div className="post-list">
      {
        !postList.length ? <PostEmptyStatus /> :
          postList.map(post => (
            <PostItem post={post} key={post.id} />
          ))
      }
    </div>
  </>
);

class PostList extends Component {
  state = {
    category: this.props.match.params.category,
    isCategoryList: (this.props.match.path === '/category')
  }

  componentDidMount() {
    const { getAllPosts, getCategoryPosts } = this.props;
    const { category } = this.state;

    if (category) {
      getCategoryPosts(category)
    } else {
      getAllPosts();
    }
  }

  componentDidUpdate(prevProps) {
    const { getCategoryPosts } = this.props;
    const { category } = this.state;
    const presentCategory = this.props.match.params.category;

    if (category && prevProps.match.params.category !== presentCategory) {
      getCategoryPosts(presentCategory);
      this.updateCategory(presentCategory);
    }
  }

  updateCategory(newCategory) {
    this.setState({
      category: newCategory
    });
  }


  render() {
    const { postList, isLoading, categoryList } = this.props;
    const { category, isCategoryList } = this.state;
    if (isLoading) return <Spinner />;

    return (
      isCategoryList ?
        (
          categoryList.map((category, i) => (
            <PostSection
              key={i}
              category={category}
              postList={postList.filter(post => post.category === category)}
            />
          ))
        ) :
        (
          <PostSection
            postList={postList}
            category={category}
          />
        )
    )
  }
}
export default withRouter(PostList);

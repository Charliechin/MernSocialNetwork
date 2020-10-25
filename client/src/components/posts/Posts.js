import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layouts/Spinner';
import PostItem from '../posts/PostItem';
import PostForm from '../posts/PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts])

  const renderPosts = posts.map(post => (
    <PostItem key={post._id} post={post} />
  ))
  return loading ? (<Spinner />) : (

    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead"> <i className="fas fa-user" />Welcome to the community </p>
      <PostForm />
      <div className="posts">
        {renderPosts}
      </div>

    </Fragment>
  )
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);
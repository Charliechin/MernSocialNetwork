import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'


const PostItem = ({
  post: {
    _id,
    name,
    text,
    user,
    avatar,
    likes,
    comments,
    date
  },
  auth
}) => {
  // useEffect(() => {
  //   getPosts();
  // }, [getPosts])

  // const RenderPosts = posts.map(post => (
  //   <p><PostItem key={post._id} post={post} /></p>
  // ))
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img
            className="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          <span>{likes.length > 0 && (
            <span>{likes.length}</span>
          )}</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>


        <Link to={`post/${_id}`} className="btn btn-primary">
          Discussion {' '} {comments.length > 0 && (
            <span className='comment-count'>{comments.length}</span>
          )}
        </Link>
        {/* Authentication, if this post belongs to the current user, show the button */}
        {!auth.loading && user === auth.user._id && (
          <button type="button" className="btn btn-danger"><i className="fas fa-times"></i></button>
        )}
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(PostItem);

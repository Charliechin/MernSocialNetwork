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
          Posted on {date}
        </p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>
          <span>4</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to="/post" className="btn btn-primary">
          Discussion <span className='comment-count'>2</span>
        </Link>
        <button
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times"></i>
        </button>
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

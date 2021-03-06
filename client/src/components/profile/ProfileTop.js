import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileTop = ({ profile: {
  status,
  company,
  location,
  website,
  social,
  user: { name, avatar }
} }) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img
        className="round-img my-1"
        src={avatar}
        alt=""
      />
      <h1 className="large">{name}</h1>
      <p className="lead">{status} at {company && <span>at {company}</span>}</p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {
          website && (
            <Link to={website} rel="noopener noreferrer"><i className="fas fa-globe fa-2x"></i>  </Link>

          )
        }
        {
          social && social.twitter && (
            <Link to={social.twitter} rel="noopener noreferrer"><i className="fab fa-twitter fa-2x"></i>  </Link>

          )
        }

        {
          social && social.facebook && (
            <Link to={social.facebook} rel="noopener noreferrer"><i className="fab fa-facebooks fa-2x"></i>  </Link>

          )
        }
        {
          social && social.linkedin && (
            <Link to={social.linkedin} rel="noopener noreferrer"><i className="fab fa-linkedin fa-2x"></i>  </Link>

          )
        }
        {
          social && social.instagram && (
            <Link to={social.instagram} rel="noopener noreferrer"><i className="fab fa-instagram fa-2x"></i>  </Link>

          )
        }

      </div>
    </div>
  )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileTop
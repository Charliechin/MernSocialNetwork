import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {


  useEffect(() => {
    console.log("GetGithubRepos");
    getGithubRepos(username)
  }, [getGithubRepos]);
  return (
    <div>
      github
    </div >
  )
}

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  repos: state.profile.repos
});



export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
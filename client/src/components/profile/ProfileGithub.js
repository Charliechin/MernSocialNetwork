import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { getGithubRepos } from '../../actions/profile';
import { Link } from 'react-router-dom'

const ProfileGithub = ({ username, getGithubRepos, repos }) => {


  useEffect(() => {
    console.log("GetGithubRepos");
    getGithubRepos(username)
  }, [getGithubRepos]);


  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
          repos.map((repo, index) => (
            <div key={index} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <Link to={repo.html_url} target='_blank' rel='noopener noreferrer'>
                    {repo.name}</Link>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                  <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                  <li className="badge badge-ligh">Forks: {repo.forks_count}</li>
                </ul>
              </div>
            </div>
          ))

        )}
    </div>
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
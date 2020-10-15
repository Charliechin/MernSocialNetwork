import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

export const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('Success');
    // This goes to redux
    // const newUser = { name, email, password }
    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'Application/json',
    //     }
    //   }

    //   const body = JSON.stringify(newUser);
    //   const res = await axios.post('/api/users', body, config);
    //   console.log(res.data);

    // } catch (error) {
    //   console.error(error.response.data);

    // }
  }

  return (
    <Fragment>

      <h1 className="large text-primary">Sign </h1>
      <p className="lead"><i className="fas fa-user"></i> Sign In</p>
      <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} name="email" />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            minLength="6"
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have one? <Link to="/register">Register</Link>
      </p> </Fragment>

  )
}

export default Login;

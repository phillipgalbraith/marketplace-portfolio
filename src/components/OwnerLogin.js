import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory, Redirect } from 'react-router-dom';

function OwnerLogin () {
  const {push} = useHistory();
  
  if( localStorage.getItem("token") ){
    push("/shop/owner");
  }

  const initialState = {
    username: '',
    password: '',
  };

  const [state, setState] = useState(initialState);
  const [hasFailed, setHasFailed] = useState(false);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await getUserData();
    if(data?Object.keys(data).includes("token"):false ){
      localStorage.setItem('token', data.token);
      localStorage.setItem('user_id', data.user_id);
      push("/shop/owner");
    }
  };

  const getUserData = () => {
    return axios
      .post(`${process.env.REACT_APP_API_URI}/auth/login`, state)
      .then(resp => {
        return resp.data;
      })
      .catch(err => {
        console.error(err);
        setHasFailed(true);
      });
  };

  return (
    <div className="log-in-container">
      {typeof localStorage.getItem('token') !== 'string' && (
        <div className="owner-log-in-card">
          <h2>Shop owners, sign in!</h2>
          <form onSubmit={handleSubmit}>
            <label>
              username
              <input
                type="text"
                value={state.username}
                onChange={handleChange}
                name="username"
              />
            </label>

            <label>
              password
              <input
                type="password"
                value={state.password}
                onChange={handleChange}
                name="password"
              />
            </label>

            <input type="submit" value="Log-In" id="submit-button"></input>
            { hasFailed && <li>"login has failed</li>}
          </form>
          <p>Don't have an account?</p>
          <Link to="/register">Register Your Business</Link>
        </div>
      )}
      {typeof localStorage.getItem('token') === 'string' && (
        <Redirect to="/shop/owner" />
      )}
    </div>
  );
};

export default OwnerLogin;

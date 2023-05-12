import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './reglog.css';
import jwt_decode from 'jwt-decode';
import UserContext from '../utils/UserContext.js';

const RegLog = () => {
  //for button toggle login & signup
  const [login, setLogin] = useState(true);
  const loginSignupContainerRef = useRef('');

  const handleClick = () => {
    setLogin(!login);
    //using useRef can do DOM manipulation
    loginSignupContainerRef.current.classList.toggle('active');
  };

  const {loginUser, registerUser, user} = useContext(UserContext);

  return (
    <div className='login-signup-container' ref={loginSignupContainerRef}>
      <div className='login'>
        <h1>Login</h1>
        <form className='login-side' onSubmit={loginUser}>
          <input
            id='username'
            label='Username'
            name='username'
            type='username'
            placeholder='username'
          />
          <input
            name='password'
            label='Password'
            type='password'
            placeholder='password'
          />
          <button type={'submit'}>Login</button>
        </form>
      </div>
      <div className='side-div'>
        <button type='button' onClick={handleClick}>
          {login ? 'Register' : 'Login'}
        </button>
      </div>
      <div className='signup'>
        <h1>Register</h1>
        <form className='signup-side' onSubmit={registerUser}>
          <input
            id='username'
            label='Username'
            name='username'
            type='username'
            placeholder='username'
          />
          <input
            id='email'
            label='Email Address'
            name='email'
            type='email'
            placeholder='email'
          />
          <input
            name='password'
            label='Password'
            type='password'
            id='password'
            placeholder='password'
          />
          <button type={'submit'}>Register</button>
        </form>
      </div>
      {user && <p>Welcome {user.username}!</p>}
    </div>
  );
};

export default RegLog;

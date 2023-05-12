import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './reglog.css';
import jwt_decode from 'jwt-decode';
import UserContext from '../utils/UserContext.js';

const RegLog = () => {
  // const navigate = useNavigate();

  // // check existence of authToken in browser storage
  // const authTokenInitState = localStorage.getItem('authTokens')
  //   ? JSON.parse(localStorage.getItem('authTokens'))
  //   : null;
  // // get the init user state by token
  // const userState = localStorage.getItem('authTokens')
  //   ? jwt_decode(localStorage.getItem('authTokens'))
  //   : null;

  // //const logUser = localStorage.getItem('user');
  // // set callback function to set the value once in initial load
  // const [user, setUser] = useState(() => userState);
  // const [authTokens, setAuthTokens] = useState(() => authTokenInitState);

  //for button toggle login & signup
  const [login, setLogin] = useState(true);
  const loginSignupContainerRef = useRef('');

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [username, setUsername] = useState('');

  const handleClick = () => {
    setLogin(!login);
    //using useRef can do DOM manipulation
    loginSignupContainerRef.current.classList.toggle('active');
  };

  // const loginUser = async (e) => {
  //   e.preventDefault();
  //   // const credentials = new FormData(e.currentTarget);
  //   // console.log(credentials);

  //   // get the api auth token from backend
  //   const response = await fetch(`http://localhost:8000/api/token/`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username,
  //       password,
  //     }),
  //   });

  //   // get the response
  //   const data = await response.json();
  //   //console.log(data)

  //   if (response.status === 200) {
  //     // update the state of auth tokens from api token
  //     setAuthTokens(data);
  //     // update user information and decode the user information from token
  //     setUser(jwt_decode(data.access));
  //     // store auth token in local storage
  //     localStorage.setItem('authTokens', JSON.stringify(data));
  //     alert('login successfully');
  //     navigate('/');
  //   } else {
  //     alert('Something went wrong!');
  //   }
  // };

  // const registerUser = async (e) => {
  //   e.preventDefault();
  //   // const credentials = new FormData(e.currentTarget);
  //   // console.log(credentials);

  //   const response = await fetch('http://localhost:8000/api/user/signup/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username,
  //       email,
  //       password,
  //     }),
  //   });

  //   let data = null;

  //   try {
  //     const responseBody = await response.text();
  //     if (responseBody) {
  //       data = JSON.parse(responseBody);
  //     }
  //   } catch (error) {
  //     console.log('Error parsing JSON:', error.message);
  //   }

  //   if (response.status === 201) {
  //     alert('register successfully');
  //     navigate('/');
  //   } else {
  //     alert('Something went wrong!');
  //   }

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
            // onChange={(e) => {
            //   setUsername(e.target.value);
            // }}
          />
          <input
            name='password'
            label='Password'
            type='password'
            placeholder='password'
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
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
            // onChange={(e) => {
            //   setUsername(e.target.value);
            // }}
          />
          <input
            id='email'
            label='Email Address'
            name='email'
            type='email'
            placeholder='email'
            // onChange={(e) => {
            //   setEmail(e.target.value);
            // }}
          />
          <input
            name='password'
            label='Password'
            type='password'
            id='password'
            placeholder='password'
            // onChange={(e) => {
            //   setPassword(e.target.value);
            // }}
          />
          <button type={'submit'}>Register</button>
        </form>
      </div>
      {user && <p>Welcome {user.username}!</p>}
    </div>
  );
};

export default RegLog;

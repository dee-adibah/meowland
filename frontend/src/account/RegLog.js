import React, {useRef, useState} from 'react';
import './register.css';

const RegLog = () => {
  //for button toggle login & signup
  const [login, setLogin] = useState(true);
  const loginSignupContainerRef = useRef('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleClick = () => {
    setLogin(!login);
    //using useRef can do DOM manipulation
    loginSignupContainerRef.current.classList.toggle('active');
  };

  const loginUser = () => {};

  const registerUser = () => {};

  return (
    <div className='login-signup-container' ref={loginSignupContainerRef}>
      <div className='login'>
        <h1>Login</h1>
        <form className='login-side' onSubmit={loginUser}>
          <input
            type={'username'}
            placeholder={'username'}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type={'password'}
            placeholder={'password'}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
            type={'username'}
            placeholder={'username'}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type={'email'}
            placeholder={'email'}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type={'password'}
            placeholder={'password'}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type={'submit'}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegLog;

import {createContext, useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
  // check existence of authToken in browser storage
  let authTokenInitState = localStorage.getItem('authTokens')
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null;
  // get the init user state by token
  let userState = localStorage.getItem('authTokens')
    ? jwt_decode(localStorage.getItem('authTokens'))
    : null;

  // set callback function to set the value once in initial load
  let [user, setUser] = useState(() => userState);
  let [authTokens, setAuthTokens] = useState(() => authTokenInitState);

  const navigate = useNavigate();

  // handle login form from login page
  const loginUser = async (e) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);
    console.log(credentials);

    // get the api auth token from backend
    const response = await fetch(`http://localhost:8000/api/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.get('username'),
        password: credentials.get('password'),
      }),
    });

    // get the response
    const data = await response.json();
    //console.log(data)

    if (response.status === 200) {
      // update the state of auth tokens from api token
      setAuthTokens(data);
      // update user information and decode the user information from token
      setUser(jwt_decode(data.access));
      // store auth token in local storage
      localStorage.setItem('authTokens', JSON.stringify(data));
      alert('login successfully');
      navigate('/');
    } else {
      alert('Something went wrong!');
    }
  };

  // handle the registration
  const registerUser = async (e) => {
    e.preventDefault();
    const credentials = new FormData(e.currentTarget);
    console.log(credentials);

    const response = await fetch('http://localhost:8000/api/user/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.get('username'),
        email: credentials.get('email'),
        password: credentials.get('password'),
      }),
    });

    const data = null;

    try {
      const responseBody = await response.text();
      if (responseBody) {
        data = JSON.parse(responseBody);
      }
    } catch (error) {
      console.log('Error parsing JSON:', error.message);
    }

    if (response.status === 201) {
      alert('please login to proceed');
      navigate(0);
    } else {
      alert('Something went wrong!');
    }
  };

  // handle logout
  let logoutUser = () => {
    // clear user and authToken state
    setAuthTokens(null);
    setUser(null);

    // remove authToken in browser
    localStorage.removeItem('authTokens');

    // redirect the user
    navigate('/');
  };

  // extract the decoded data
  const contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

import React, {useState, useEffect, useContext} from 'react';
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import './navbar.css';
import PetsIcon from '@mui/icons-material/Pets';
import {useNavigate} from 'react-router-dom';
import UserContext from '../../utils/UserContext.js';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const {logoutUser, user} = useContext(UserContext);
  return (
    <div className='pml__navbar'>
      <div className='pml__navbar-links'>
        <div className='pml__navbar-title'>
          <PetsIcon /> MeowLand
        </div>
        <div className='pml__navbar-links_container'>
          <a href='/'>Home</a>
          <a href='/forum'>Forum</a>
          <a href='/breed'>Breeds</a>
        </div>
      </div>
      <div className='pml__navbar-sign'>
        {user ? (
          <div className='pml__navbar-sign'>
            <p>
              <a href='/profile'>{user.username}</a>
            </p>
            <button type='button' onClick={logoutUser}>
              Logout
            </button>
          </div>
        ) : (
          <button type='button'>
            <a href='/sign'>Login/Register</a>
          </button>
        )}
      </div>
      <div className='pml__navbar-menu'>
        {toggleMenu ? (
          <RiCloseLine
            color='#fff'
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color='#fff'
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className='pml__navbar-menu_container scale-up-center'>
            <div className='pml__navbar-menu_container-links'>
              <p>
                <a href='/'>Home</a>
              </p>
              <p>
                <a href='/forum'>Forum</a>
              </p>
              <p>
                <a href='/breed'>Breeds</a>
              </p>
            </div>

            <div className='pml__navbar-menu_container-links-sign'>
              <p></p>
              {user ? (
                <div className='pml__navbar-menu_container-links'>
                  <p>
                    <a href='/profile'>{user.username}</a>
                  </p>
                  <button type='button' onClick={logoutUser}>
                    Logout
                  </button>
                </div>
              ) : (
                <button type='button'>
                  <a href='/sign'>Login/Register</a>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

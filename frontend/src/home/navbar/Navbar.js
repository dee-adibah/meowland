import React, {useState} from 'react';
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import './navbar.css';
import {Icon} from 'semantic-ui-react';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className='pml__navbar'>
      <div className='pml__navbar-links'>
        <div className='pml__navbar-title'>
          <Icon name='paw' size='large' /> MeowLand
        </div>
        <div className='pml__navbar-links_container'>
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
      </div>
      <div className='pml__navbar-sign'>
        <button type='button'>
          <a href='/sign'>Login/Register</a>
        </button>
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
              <button type='button'>
                <a href='/sign'>Login/Register</a>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

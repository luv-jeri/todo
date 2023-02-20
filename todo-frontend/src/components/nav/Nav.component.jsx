import React from 'react';
import s from './Nav.module.css';
import { useAuth } from '../../context/Auth.context';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import login_icon from '../../assets/login-icon.svg';

function NavComponent() {
  const { user, sign_out } = useAuth();
  const navigate = useNavigate(); 

  const handleLogin = () => {
    navigate('/sign_in');
  };

  return (
    <nav className={s.container}>
      <div id='logo' className={s.logo}>
        <img src={logo} />
        <h4>PleaseDo</h4>
      </div>
      <div id='search' className={s.search}>
        <input placeholder='Look up....' />
      </div>
      <div id='profile' className={s.profile}>
        <img
          onClick={() => {
            if (!user) {
              handleLogin();
            } else {
              sign_out();
            }
          }}
          src={user ? user.photo : login_icon}
        />
      </div>
    </nav>
  );
}

export default NavComponent;

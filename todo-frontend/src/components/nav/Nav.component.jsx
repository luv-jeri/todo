import React from 'react';
import s from './Nav.module.css';
import { useAuth } from '../../context/Auth.context';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import login_icon from '../../assets/login-icon.svg';
import { useModal } from '../../wrappers/modal/Modal.wrapper';
import Profile from '../../modals/Profile/Profile.modal';

function NavComponent() {
  const { user, sign_out } = useAuth();
  const { openModal } = useModal();
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
      <div
        onClick={() => {
          if (!user) {
            handleLogin();
          } else {
            openModal(<Profile />);
          }
        }}
        id='profile'
        className={s.profile}
      >
        <img src={user ? user.photo : login_icon} />
      </div>
    </nav>
  );
}

export default NavComponent;

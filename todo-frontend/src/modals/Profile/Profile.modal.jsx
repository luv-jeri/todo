import React from 'react';
import { useAuth } from '../../context/Auth.context';
import s from './Profile.module.css';
function Profile() {
  const { user , sign_out } = useAuth();
  // user have photo , name , email and a signout function

  return (
    <div className={s.container}>
      <div className={s.profile}>
        <img src={user.photo} />
        <h4>{user.name}</h4>
        <p>{user.email}</p>
      </div>
      <div onClick={sign_out} className={s.logout}>
        Logout
      </div>
    </div>
  );
}

export default Profile;

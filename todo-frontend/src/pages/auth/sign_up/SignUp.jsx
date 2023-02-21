import React, { useState } from 'react';
import s from './SignUp.module.css';
import UploaderComponent from '../../../components/uploader/Uploader.component';
import { useAuth } from '../../../context/Auth.context';
import { useNavigate, Navigate } from 'react-router-dom';
import { useNotification } from '../../../wrappers/notification/Notification.wrapper';
import catcher from '../../../utils/catcher';

function SignUp() {
  const { sign_up, user } = useAuth();

  if (user) return <Navigate to='/' />;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const { showNotification } = useNotification();

  const navigate = useNavigate();

  const handleClick = catcher(
    async (e) => {
      e.preventDefault();

      const data = await sign_up({
        photo: image,
        name,
        email,
        password,
        confirmPassword,
      });

      console.log(data);

      return data;
    },
    (error) => {
      showNotification({
        title: error.title || 'Sign Up Error',
        message: error.message,
        type: 'error',
      });
    },
    (data) => {
      showNotification({
        title: 'Sign Up Success',
        message: 'You have successfully signed up',
        type: 'success',
      });
      navigate('/');
    }
  );

  const handleNavigate = () => {
    navigate('/sign_in');
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        <h1>Sign Up</h1>

        <form onSubmit={handleClick}>
          <UploaderComponent onUpload={setImage} />
          <div className={s.input}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              required
              id='name'
              value={name}
              className={s.input_field}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={s.input}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              required
              id='email'
              value={email}
              className={s.input_field}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={s.input}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              required
              name='password'
              id='password'
              value={password}
              className={s.input_field}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={s.input}>
            <label htmlFor='confirm_password'>Confirm Password</label>
            <input
              type='password'
              required
              name='confirm_password'
              id='confirm_password'
              value={confirmPassword}
              className={s.input_field}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type='submit'>Sign Up</button>
          <h6 onClick={handleNavigate}>Already a user ?</h6>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

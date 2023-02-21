import React, { useState, useMemo } from 'react';
import s from './SignIn.module.css';
import { useAuth } from '../../../context/Auth.context';
import { useNavigate, Navigate } from 'react-router-dom';
import { useNotification } from '../../../wrappers/notification/Notification.wrapper';
import catcher from '../../../utils/catcher';
import Form from '../../../components/form/Form.component';

function SignIn() {
  const { sign_in, user } = useAuth();

  if (user) {
    return <Navigate to='/' />;
  }

  const navigate = useNavigate();

  const { showNotification } = useNotification();

  const handleClick = catcher(
    async (value) => {
      const data = sign_in(value.email, value.password);
      return data;
    },
    (error) => {
      showNotification({
        title: error.title || 'Sign In Error',
        message: error.message,
        type: 'error',
      });
    }
  );

  const handleNavigate = () => {
    navigate('/sign_up');
  };

  const fields = useMemo(
    () => [
      {
        type: 'email',
        name: 'email',
        id: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
      },
      {
        type: 'password',
        name: 'password',
        id: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
      },
    ],
    []
  );

  return (
    <div className={s.container}>
      <div className={s.form}>
        <Form
          fields={fields}
          onSubmit={handleClick}
          title={'Sign In'}
          submitText='Sign In'
        />
        <h6 onClick={handleNavigate}>Not a user ?</h6>
      </div>
    </div>
  );
}

export default SignIn;

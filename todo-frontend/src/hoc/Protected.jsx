import React from 'react';
import { useAuth } from '../context/Auth.context';
import { Navigate } from 'react-router-dom';

function withProtected(Component) {
  return function ProtectedComponent(props) {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to='/sign_in' />;
    }

    return <Component {...props} />;
  };
}

export default withProtected;

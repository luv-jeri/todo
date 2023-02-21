import React from 'react';
import { useAuth } from '../../context/Auth.context';
import { Navigate } from 'react-router-dom';

function Protected({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/sign_in' />;
  }

  return <>{children}</>;
}

export default Protected;

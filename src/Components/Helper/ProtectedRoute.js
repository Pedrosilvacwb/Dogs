import React from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../userContext';

const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(userContext);

  return login ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

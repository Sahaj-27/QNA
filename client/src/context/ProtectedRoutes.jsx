import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserInfoContext } from './UserInfoContext';

function ProtectedRoute({ component: Component, ...rest }) {
  const { user_id } = useContext(UserInfoContext);

  return (
    <Route
      {...rest}
      render={props =>
        user_id ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
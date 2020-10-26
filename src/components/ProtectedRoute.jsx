/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Auth } from '../pages/Auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <Route
      {...rest}
      render={
        (props) => (user === null ? <Auth /> : <Component {...props} />)
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  );
};

export default ProtectedRoute;

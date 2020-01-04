import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { StoreKeys } from '../shared/constants';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !!localStorage.getItem(StoreKeys.USER)
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
)

export default PrivateRoute;
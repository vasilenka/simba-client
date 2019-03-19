import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/context';

function PrivateRoute({ component: Component, ...rest }) {

  let context = React.useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props =>
        context && context.token && context.user.role === 'dispatcher' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
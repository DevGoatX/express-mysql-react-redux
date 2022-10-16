import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isAuthenticated } from '../utils/jwtUtil';

const RestrictRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Redirect
                    to={{
                        pathname: '/dashboard',
                        state: { from: props.location },
                    }}
                />
            ) : (
                    <Component {...props} />
            )
        }
    />
);

RestrictRoute.propTypes = {
    component: PropTypes.object.isRequired,
    location: PropTypes.object
};

export default RestrictRoute;
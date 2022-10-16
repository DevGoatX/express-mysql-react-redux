import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';

const PublicRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => (
            <Component {...props} />
        )}
    />
);

PublicRoute.propTypes = {
  location: PropTypes.any,
  component: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired
};

export default PublicRoute;
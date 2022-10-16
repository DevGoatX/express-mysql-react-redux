import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as authAction from '../../actions/authAction';

// Import custom components
import LoginForm from '../../components/auth/LoginForm';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.props.actions.setNoError();

    this.submitForm = this.submitForm.bind(this);
  }

  /**
   * Submit the form.
   *
   * @param {object} formProps
   */
  submitForm(formProps) {
    this.props.actions.login(formProps);
  }

  render() {
    return <LoginForm onSubmit={this.submitForm} errorMessage={this.props.errorMessage} />;
  }
}

LoginContainer.propTypes = {
  actions: PropTypes.actions,
  errorMessage: PropTypes.string
};

/**
 * Map the state to props.
 */
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isAuthenticated: state.auth.isAuthenticated,
  errorMessage: state.auth.loginError,
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, authAction), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

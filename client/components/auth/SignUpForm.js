import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Import custom components
import renderText from '../common/form/renderText';
import CustomizedSnackbar from '../common/snakebar/CustomizedSnackbar';

const styles = {
  root: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '15%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  card: {
    padding: 20,
    overflow: 'auto',
  },
  cardHeader: {
    textAlign: 'center',
  },
  btnDiv: {
    textAlign: 'center',
  },
  btn: {
    marginTop: 21,
  },
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, onSubmit, classes, errorMessage } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader className={classes.cardHeader} title="Sign Up" />
          {errorMessage && (
            <CustomizedSnackbar variant="error" className={classes.margin} message={errorMessage} />
          )}
          <CardContent>
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <Field type="text" name="email" component={renderText} label="Email" />
              <br />
              <Field type="password" name="password" component={renderText} label="Password" />
              <br />
              <div className={this.props.classes.btnDiv}>
                <Button className={this.props.classes.btn} type="submit" variant="contained" color="primary">
                  Create New Account
                </Button>
                <p>
                  Already have an account? <Link to={'/'}>Login</Link>.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const validateSignUp = (values) => {
  const errors = {};

  const requiredFields = ['email', 'password'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = '(The ' + field + ' field is required.)';
    }
  });

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '(Invalid email address.)';
  }

  if (values['password'] && values['password'].length < 6) {
    errors.password = '(The password length must be at least 6 characters long.)';
  }
  
  return errors;
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default reduxForm({
  form: 'SignUpForm', // a unique identifier for this form
  validate: validateSignUp, // ←Callback function for client-side validation
})(withStyles(styles)(SignUpForm));
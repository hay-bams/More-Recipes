import React from 'react';
import PropTypes from 'prop-types';
import SiginForm from '../../containers/SigninForm';
import Navigation from '../Navigation';

const SigninPage = props => (
  <div>
    <Navigation  {...props} />
    <SiginForm redirectUser={props.history} />
  </div>
);

SigninPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default SigninPage;

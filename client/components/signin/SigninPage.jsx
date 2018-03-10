import React from 'react';
import PropTypes from 'prop-types';
import ConnectedSigninForm from '../../containers/SigninForm';
import { Navigation } from '../Navigation';


export const SigninPage = props => (
  <div>
    <Navigation  {...props} />
    <ConnectedSigninForm redirectUser={props.history} />
  </div>
);

SigninPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default SigninPage;

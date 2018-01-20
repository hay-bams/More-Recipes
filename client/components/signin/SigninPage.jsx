import React from 'react';
import PropTypes from 'prop-types';
import SiginForm from '../../containers/SigninForm';
import Navigation from '../Navigation';


const SigninPage = props => (
  <div className="bg-dark">
    <Navigation />
    <SiginForm redirectUser={props.history} />
  </div>
);


// SigninPage.defaultProps = {
//   history: {}
// };

SigninPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default SigninPage;

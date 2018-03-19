import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signout } from '../actions/user';

const SignoutPage = (props) => {
  const userData = JSON.parse(localStorage.userData);
  const userToken = userData.token;
  localStorage.removeItem('userData');
  props.signout(userToken);
  props.history.push('/signin');
  return <div />;
};

const mapStateToProps = state => ({
  errorMsg: state.errors.signUpError
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signout }, dispatch);


SignoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  signout: PropTypes.func.isRequired

};

export default connect(mapStateToProps, mapDispatchToProps)(SignoutPage);


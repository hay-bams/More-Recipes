import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signout } from '../actions/actions';

const SignoutPage = (props) => {
  localStorage.removeItem('userData');
  props.signout();
  props.history.push('/signin');
  return <div />;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ signout }, dispatch);


SignoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  signout: PropTypes.func.isRequired

};

export default connect(null, mapDispatchToProps)(SignoutPage);


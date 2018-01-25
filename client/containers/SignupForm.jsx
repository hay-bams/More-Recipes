import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { signup } from '../actions/actions';
import Authenticate from '../auth/auth';

/**
 * @class SignupForm
 */
class SignupForm extends React.Component {
  /**
   * @returns{void} constructor
   */
  constructor() {
    super();
    this.message = '';
    this.signup = this.signup.bind(this);
    this.state = {
      errors: {}
    };
  }

  /**
   * @returns {void} componentDidUpdate
   */
  componentDidUpdate() {
    if (Object.keys(this.props.userData).length > 0) {
      this.props.redirectUser.push('/dashboard');
    }
  }

  /**
   * @param {obj} event
   * @returns {void} signup
   */
  signup(event) {
    event.preventDefault();
    const user = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value
    };
    const errors = Authenticate.validateUserSignup(user);

    if (errors.email !== '' || errors.password !== '' ||
       errors.firstName !== '' || errors.lastName !== '' ||
       errors.confirmPassword !== '') {
      return this.setState({ errors });
    }


    this.props.signup(user);
  }

  /**
   * @returns {void} render
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="container-fluid main-register-container">
        <div className="row">
          <div className="col-sm-8 col-md-5 mx-auto">
            <div className="card  mt-5">
              <div className="card-header">
                  Register
              </div>

              <span>{this.props.errorMsg}</span>
              <div className="card-body">
                <form onSubmit={e => this.signup(e)}>
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter First name"
                    />
                    { errors.firstName &&
                    <span className="help-block">
                      {errors.firstName}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Last name"
                    />
                    { errors.lastName &&
                    <span className="help-block">
                      {errors.lastName}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                    { errors.email &&
                    <span className="help-block">
                      {errors.email}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                    />
                    { errors.password &&
                    <span className="help-block">
                      {errors.password}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                    { errors.confirmPassword &&
                    <span className="help-block">
                      {errors.confirmPassword}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-success btn-block"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
  errorMsg: state.errors.signUpError
});

SignupForm.defaultProps = {
  userData: {},
  redirectUser: {},
  errorMsg: ''
};

SignupForm.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string
    })
  }),
  errorMsg: PropTypes.string,
  signup: PropTypes.func.isRequired,
  redirectUser: PropTypes.shape({
    push: PropTypes.func
  })
};

const mapDispatchToProps = dispatch => bindActionCreators({ signup }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);


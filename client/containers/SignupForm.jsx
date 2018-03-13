import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { signup } from '../actions/user';
import Authenticate from '../auth/auth';

/**
 * @class SignupForm
 */
export class SignupForm extends React.Component {
  /**
   * @returns{void} constructor
   */
  constructor() {
    super();
    this.message = '';
    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      firstName: null,
      lastName: null,
      email: '',
      password: null,
      confirmPassword: null,
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: ''
    };
  }

  /**
   * @returns {void} componentDidUpdate
   */
  componentDidUpdate() {
    if (Object.keys(this.props.userData).length > 0) {
      this.props.redirectUser.push('/');
    }
  }

  /**
  *
  * @param {obj} event
  * @returns {void} onChange
  */
  onChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {obj} event
   * @returns {void} signup
   */
  signup(event) {
    event.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    const errors = Authenticate.validateUserSignup(user);

    if (errors.email !== '' || errors.password !== '' ||
       errors.firstName !== '' || errors.lastName !== '' ||
       errors.confirmPassword !== '') {
      return this.setState({
        firstNameError: errors.firstName,
        lastNameError: errors.lastName,
        emailError: errors.email,
        passwordError: errors.password,
        confirmPasswordError: errors.confirmPassword
      });
    }

    this.props.signup(user);
  }

  /**
   * @returns {void} render
   */
  render() {
    return (
      <div className="container-fluid main-register-container">
        <div className="row overlay">
          <div className="col-sm-8 col-md-5 mx-auto">
            <div className="card  mt-5 card-form">
              <div className="card-header text-center">
               Sign Up
              </div>
              <div className="card-body">
                <form onSubmit={e => this.signup(e)}>
                  <div className="form-group">
                    <input
                      onChange={this.onChange}
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="Enter First name"
                    />
                    { this.state.firstNameError &&
                    <span className="help-block error text-danger">
                      {this.state.firstNameError}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      onChange={this.onChange}
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Enter Last name"
                    />
                    { this.state.lastNameError &&
                    <span className="help-block error text-danger">
                      {this.state.lastNameError}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      onChange={this.onChange}
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                    { this.state.emailError &&
                    <span className="help-block error text-danger">
                      {this.state.emailError}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      onChange={this.onChange}
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                    />
                    { this.state.passwordError &&
                    <span className="help-block error text-danger">
                      {this.state.passwordError}
                    </span>
                      }
                  </div>

                  <div className="form-group">
                    <input
                      onChange={this.onChange}
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                    />
                    { this.state.confirmPasswordError &&
                    <span className="help-block error text-danger">
                      {this.state.confirmPasswordError}
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
  userData: state.userData
});

SignupForm.defaultProps = {
  userData: {},
  redirectUser: {}
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
  signup: PropTypes.func.isRequired,
  redirectUser: PropTypes.shape({
    push: PropTypes.func
  })
};

const mapDispatchToProps = dispatch => bindActionCreators({ signup }, dispatch);

const ConnectedSignupForm =
connect(mapStateToProps, mapDispatchToProps)(SignupForm);

export default ConnectedSignupForm;


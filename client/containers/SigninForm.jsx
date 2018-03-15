import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signin } from '../actions/user';
import Authenticate from '../auth/auth';

/**
 * @class Signin
 */
export class SigninForm extends React.Component {
  /**
   * Initialize component state
   * @param {obj} props component props
   */
  constructor(props) {
    super(props);
    this.signin = this.signin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    };
  }

  /**
   * Execute when component updates
   * @returns {null} null
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
   * Execute when component updates
   * @param {obj} event event object
   * @returns {null} null
   */
  signin(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    const errors = Authenticate.validateUserSignin(user);

    if (errors.email !== '' || errors.password !== '') {
      return this.setState({
        emailError: errors.email, passwordError: errors.password
      });
    }
    this.props.signin(user);
  }

  /**
   * @returns {obj} render
   */
  render() {
    return (
      <div className="container-fluid main-login-container">
        <div className="row main-login overlay">
          <div className="col-12 col-sm-8 col-md-5 mx-auto">
            <div className="card  mt-5 card-form">
              <div className="card-header text-center">
                    Login
              </div>

              <div className="card-body ">
                <form onSubmit={this.signin}>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      onChange={this.onChange}
                    />
                    { this.state.emailError &&
                    <span className="help-block error text-danger">
                      {this.state.emailError}
                    </span>
                    }
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter Password"
                      onChange={this.onChange}
                    />
                  </div>
                  {this.state.passwordError &&
                    <span className="error error text-danger">
                      {this.state.passwordError}
                    </span>
                  }

                  <div className="form-group">
                    <input type="checkbox" name="checkbox" />
                         Remember me
                  </div>

                  <div className="form-group">
                    <input
                      id="signinButton"
                      type="submit"
                      value="Log in"
                      className="btn btn-success btn-block"
                    />
                  </div>

                  <div className="text-center">
                    <Link
                      to="/signup"
                      className="d-block small mt-3"
                    >Register an Account
                    </Link>
                    <Link
                      to="/signin"
                      className="d-block small"
                    >Forgot Password?
                    </Link>
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

SigninForm.defaultProps = {
  userData: {},
  redirectUser: {},
};

SigninForm.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      id: PropTypes.number,
      lastName: PropTypes.string
    })
  }),
  signin: PropTypes.func.isRequired,
  redirectUser: PropTypes.shape({
    push: PropTypes.func
  })
};

const mapStateToProps = state => ({
  userData: state.userData,
  errorMsg: state.errors.signInError
});

const mapDispatchToProps = dispatch => bindActionCreators({ signin }, dispatch);

const ConnectedSigninForm =
connect(mapStateToProps, mapDispatchToProps)(SigninForm);

export default ConnectedSigninForm;

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signin } from '../actions/actions';
import Authenticate from '../auth/auth';

/**
 * @class Signin
 */
class SigninForm extends React.Component {
  /**
   * Initialize component state
   * @param {obj} props component props
   */
  constructor(props) {
    super(props);

    this.signin = this.signin.bind(this);
    this.state = {
      errors: {}
    };
  }

  //  create a bug fix branch for this feature tomorrow

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
   * Execute when component updates
   * @param {obj} event event object
   * @returns {null} null
   */
  signin(event) {
    event.preventDefault();
    const user = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    let errors = Authenticate.validateUserSignin(user);

    if (errors.email !== '' || errors.password !== '') {
      return this.setState({ errors });
    }

    this.props.signin(user);

    errors = {};
    this.setState({ errors });
  }

  /**
   * @returns {obj} render
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="container-fluid main-login-container">
        <div className="row main-login overlay">
          <div className="col-12 col-sm-8 col-md-5 mx-auto">
            <div className="card  mt-5 card-form">
              <div className="card-header text-center">
                    Login
              </div>

              <span className="text-center error text-danger">
                { this.props.errorMsg }
              </span>

              <div className="card-body ">
                <form onSubmit={this.signin}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                    { errors.email &&
                    <span className="help-block error text-danger">
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
                  </div>
                  {errors.password &&
                  <span className="error error text-danger">{errors.password}</span>
                      }

                  <div className="form-group">
                    <input type="checkbox" name="checkbox" />
                         Remember me
                  </div>

                  <div className="form-group">
                    <input
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
  errorMsg: ''
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
  errorMsg: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);

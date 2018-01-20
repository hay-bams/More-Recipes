import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { signup } from '../actions/actions.js';
import Authenticate from '../auth/auth.js';

/**
 * @class SignupForm
 */
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.message = "";
    this.signup = this.signup.bind(this);
    this.state = {
      errors: {}
    }
  }

  componentDidUpdate() {
    this.props.user.userData !== undefined ? this.props.redirectUser.push('/dashboard') : "";
  }

  signup(event) {
    event.preventDefault();
    const user = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    }
    const errors = Authenticate.validateUserSignup(user);

    if (errors.email !== '' || errors.password !== '' ||
       errors.firstName !== '' || errors.lastName !== '' ||
       errors.confirmPassword !== '') {
        return this.setState({ errors }) 
    }


    this.props.signup(user);
  }

  render() {
    const { errors } = this.state;
      return(
          <div className = "container-fluid main-register-container">
          <div className = "row">
            <div className = "col-sm-8 col-md-5 mx-auto">
              <div className = "card  mt-5">
                <div className = "card-header">
                  Register 
                </div>
    
                <span>{this.props.errorMsg}</span>
                <div className = "card-body">
                  <form onSubmit={(e) => this.signup(e)}>
                      <div className = "form-group">
                      <label htmlFor = "first_name">First Name</label>
                      <input ref={(input) => this.firstName = input} type="text" name="firstName" className = "form-control" placeholder="Enter First name" />
                      { errors.firstName &&
                        <span className="help-block">
                          {errors.firstName}
                        </span>
                      }
                    </div>
    
                      <div className = "form-group">
                      <label htmlFor = "last_name">Last Name</label>
                      <input ref={(input) => this.lastName = input} type="text" name="lastName" className = "form-control" placeholder="Enter Last name" />
                      { errors.lastName &&
                        <span className="help-block">
                          {errors.lastName}
                        </span>
                      }
                    </div>
    
                    <div className = "form-group">
                      <label htmlFor = "email">Email</label>
                      <input ref={(input) => this.email = input} type="email" name="email" className = "form-control" placeholder="Enter Email" />
                      { errors.email &&
                        <span className="help-block">
                          {errors.email}
                        </span>
                      }
                    </div>
    
                    <div className = "form-group">
                      <label htmlFor = "password">Password</label>
                      <input ref={(input) => this.password = input} type="password" name="password" className = "form-control" placeholder="Enter Password" />
                      { errors.password &&
                        <span className="help-block">
                          {errors.password}
                        </span>
                      }
                    </div>
    
                      <div className = "form-group">
                      <label htmlFor = "password">Confirm Password</label>
                      <input ref={(input) => this.confirmPassword = input} type="password" name="Confirmpassword" className = "form-control" placeholder="Confirm Password" />
                      { errors.confirmPassword &&
                        <span className="help-block">
                          {errors.confirmPassword}
                        </span>
                      }
                    </div>
    
                    <div className = "form-group">
                      <input type="submit" value = "Register" className = "btn btn-success btn-block" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    errorMsg: state.errors.signUpError
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({signup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);


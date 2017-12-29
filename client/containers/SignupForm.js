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
  }

  componentDidUpdate() {
    this.props.user.userData !== undefined ? this.props.redirectUser.push('/dashboard') : "";
  }

  signup(e) {
    e.preventDefault();
    const user = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    }
    this.message = Authenticate.validateUserSignup(user);
    this.props.signup(user);
    this.message = this.message ? this.message : "Email already exist";
  }

  render() {
      return(
          <div className = "container-fluid main-register-container">
          <div className = "row">
            <div className = "col-sm-8 col-md-5 mx-auto">
              <div className = "card  mt-5">
                <div className = "card-header">
                  Register 
                </div>
    
                <div className = "card-body">
                <span>{this.message}</span>
                  <form onSubmit={(e) => this.signup(e)}>
                      <div className = "form-group">
                      <label htmlFor = "first_name">First Name</label>
                      <input ref={(input) => this.firstName = input} type="text" name="firstName" className = "form-control" placeholder="Enter First name" />
                    </div>
    
                      <div className = "form-group">
                      <label htmlFor = "last_name">Last Name</label>
                      <input ref={(input) => this.lastName = input} type="text" name="lastName" className = "form-control" placeholder="Enter Last name" />
                    </div>
    
                    <div className = "form-group">
                      <label htmlFor = "email">Email</label>
                      <input ref={(input) => this.email = input} type="email" name="email" className = "form-control" placeholder="Enter Email" />
                    </div>
    
                    <div className = "form-group">
                      <label htmlFor = "password">Password</label>
                      <input ref={(input) => this.password = input} type="password" name="password" className = "form-control" placeholder="Enter Password" />
                    </div>
    
                      <div className = "form-group">
                      <label htmlFor = "password">Confirm Password</label>
                      <input ref={(input) => this.confirmPassword = input} type="password" name="Confirmpassword" className = "form-control" placeholder="Confirm Password" />
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
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({signup}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
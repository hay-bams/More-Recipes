import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { Link } from 'react-router-dom';
import { signin } from '../actions/actions.js';
import Authenticate from '../auth/auth.js';

/**
 * @class Signin
 */
class SigninForm extends React.Component {
  constructor(props) {
    super(props);

    this.signin = this.signin.bind(this);
    this.state = {
      errors: {}
    }
  }

  //create a bug fix branch for this feature tomorrow

  componentDidUpdate() {
    this.props.user.userData !== undefined ? this.props.redirectUser.push('/dashboard') : '';
  }



  signin(event) {
    event.preventDefault();
    const user = {
      email: this.email.value,
      password: this.password.value
    }
    const errors = Authenticate.validateUserSignin(user);
 
    if (errors.email !== '' || errors.password !== '') {
      return this.setState({ errors }) 
    }

    const message = this.props.signin(user);
    console.log(message) 
  }

    render() {
      const  { errors }  = this.state;
        return (
            <div className = "container-fluid main-login-container">
            <div className = "row main-login">
              <div className = "col-12 col-sm-8 col-md-5 mx-auto">
                <div className = "card  mt-5">
                  <div className = "card-header">
                    Login
                  </div>
      
                  <div className = "card-body ">
                    <form onSubmit = {this.signin}>
                      <div className = "form-group">
                        <label htmlFor = "email">Email</label>
                        <input ref = {(input) => this.email = input} type="email" name="email" className = "form-control" placeholder="Enter Email"/>
                            { errors.email &&
                              <span className="help-block">
                                {errors.email}
                              </span>
                            }
                      </div>
      
                      <div className = "form-group">
                        <label htmlFor = "password">Password</label>
                        <input ref = {(input) => this.password = input} type="password" name="password" className = "form-control" placeholder="Enter Password"/>
                      </div>
                      {errors.password &&
                      <span>{errors.password}</span>
                      }
      
                      <div className = "form-group">
                        <input type="checkbox" name="checkbox" />
                         Remember me
                      </div>
      
                      <div className = "form-group">
                        <input type="submit" value = "Log in" className = "btn btn-success btn-block" />
                      </div>
      
                       <div className="text-center">
                        <Link to='/signup' className="d-block small mt-3">Register an Account</Link>
                        <Link to='/signin' className="d-block small">Forgot Password?</Link>
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
    errorMsg: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({signin}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninForm);
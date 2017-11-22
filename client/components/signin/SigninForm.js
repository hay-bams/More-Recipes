import React from 'react';
import { Link } from 'react-router-dom';
/**
 * @class Signin
 */
class SigninForm extends React.Component {
    render() {
        return (
            <div className = "container-fluid main-login-container">
            <div className = "row main-login">
              <div className = "col-12 col-sm-8 col-md-5 mx-auto">
                <div className = "card  mt-5">
                  <div className = "card-header">
                    Login
                  </div>
      
                  <div className = "card-body ">
                    <form>
                      <div className = "form-group">
                        <label htmlFor = "email">Email</label>
                        <input type="email" name="email" className = "form-control" placeholder="Enter Email" />
                      </div>
      
                      <div className = "form-group">
                        <label htmlFor = "password">Password</label>
                        <input type="password" name="password" className = "form-control" placeholder="Enter Password" />
                      </div>
      
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

export default SigninForm;
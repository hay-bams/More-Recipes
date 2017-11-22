import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class SignupForm
 */
class SignupForm extends React.Component {
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
                    <form>
                       <div className = "form-group">
                        <label htmlFor = "first_name">First Name</label>
                        <input type="text" name="first_name" className = "form-control" placeholder="Enter First name" />
                      </div>
      
                       <div className = "form-group">
                        <label htmlFor = "last_name">Last Name</label>
                        <input type="text" name="last_name" className = "form-control" placeholder="Enter Last name" />
                      </div>
      
                      <div className = "form-group">
                        <label htmlFor = "email">Email</label>
                        <input type="email" name="email" className = "form-control" placeholder="Enter Email" />
                      </div>
      
                      <div className = "form-group">
                        <label htmlFor = "password">Password</label>
                        <input type="password" name="password" className = "form-control" placeholder="Enter Password" />
                      </div>
      
                       <div className = "form-group">
                        <label htmlFor = "password">Confirm Password</label>
                        <input type="password" name="password" className = "form-control" placeholder="Confirm Password" />
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

export default SignupForm;
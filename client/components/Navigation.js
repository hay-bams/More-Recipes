import React from 'react';
import {Link, NavLink} from 'react-router-dom';

class Navigation extends React.Component {
    render() {
      return (
        <header>
        <nav className="navbar navbar-expand-md navbar-light fixed-top navigationBar">
          <div className = "container">
            <NavLink to='/' className="navbar-brand">My Recipes</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
  
            <div className="collapse navbar-collapse resetNav" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className = "nav-item active">
                </li>
                <li className="nav-item active">
                  <NavLink to='/signin' className="nav-link">Sign in <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/signup' className="nav-link">Sign up</NavLink>
                </li>
              </ul>
            </div>
            </div>
        </nav>
      </header>
      )
    }
}

export default Navigation;
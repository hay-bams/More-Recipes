import React from 'react';
import {Link, NavLink} from 'react-router-dom';

/**
 * @class HomePageNavigation
 */
class HomePageNavigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light fixed-top navigationBar">
        <div className = "container-fluid">
          <NavLink to='/' className="navbar-brand">My Recipe Logo</NavLink>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <NavLink to='/dashboard' className="nav-link">Dashboard</NavLink>
            </li>

            <li className="nav-item">
                <NavLink to='/catalogue' className="nav-link">Catalogue</NavLink>
            </li>

            <li className="nav-item active">
                <NavLink to = "/signin" className="nav-link" href="login.html">Sign in <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
                <NavLink to = "/signup" className="nav-link" href="register.html">Sign up</NavLink>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default HomePageNavigation;
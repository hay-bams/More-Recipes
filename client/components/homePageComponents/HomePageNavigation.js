import React from 'react';
import {Link} from 'react-router-dom';

/**
 * @class HomePageNavigation
 */
class HomePageNavigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light fixed-top navigationBar">
        <div className = "container-fluid">
          <Link to='/' className="navbar-brand">My Recipe Logo</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="add_recipe.html">Dashboard</a>
            </li>

            <li className="nav-item">
                <Link to='/catalogue' className="nav-link">Catalogue</Link>
            </li>

            <li className="nav-item active">
                <a className="nav-link" href="login.html">Sign in <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="register.html">Sign up</a>
            </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default HomePageNavigation;
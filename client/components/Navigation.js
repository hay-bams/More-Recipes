import React from 'react';
import {Link} from 'react-router-dom';

class Navigation extends React.Component {
    render() {
      return (
        <header>
        <nav className="navbar navbar-expand-md navbar-light fixed-top navigationBar">
          <div className = "container">
            <Link to='/' className="navbar-brand">My Recipes</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
  
            <div className="collapse navbar-collapse resetNav" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className = "nav-item active">
                </li>
                <li className="nav-item active">
                  <Link to='/signin' className="nav-link">Sign in <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to='/signup' className="nav-link">Sign up</Link>
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
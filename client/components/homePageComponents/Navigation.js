import React from 'react';

/**
 * @class Navigation
 */
class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light fixed-top navigationBar">
        <div className = "container-fluid">
          <a className="navbar-brand" href="#">My Recipe Logo</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="add_recipe.html">Dashboard</a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="catalogue.html">Catalogue</a>
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

export default Navigation;
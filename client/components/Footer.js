import React from 'react';

/**
 * @class Footer
 */
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className = "container">
          <div className = "row">
            <div className = " col- col-sm-6">
                <p>Call us at <span className = "phone">+2348093747838</span></p>
                <p>All contents &copy; Ayobami</p>
            </div>

            <div className = "col- col-sm-6">
              <nav className="navbar navbar-expand navbar-dark ">
                  <ul className="navbar-nav ml-sm-auto">
                    <li className="nav-item active">
                      <a className="nav-link" href="add_recipe.html">Dashboard <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="catalogue.html">Catalogue</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="register.html">Signup</a>
                    </li>
                  </ul>
              </nav> 
            </div>
          </div>
        </div> 
      </footer>
    )
  }
}

export default Footer;
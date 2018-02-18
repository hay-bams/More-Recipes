import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="row">
        <div className=" col- col-sm-6">
          <p>Call us at <span className="phone">+2348093747838</span></p>
          <p>All contents &copy; Ayobami</p>
        </div>

        <div className="col- col-sm-6">
          <nav className="navbar fixed-bottom  navbar-expand navbar-dark ">
            <ul className="navbar-nav ml-sm-auto">
              <li className="nav-item active">
                <Link
                  className="nav-link"
                  to="add_recipe.html"
                >Dashboard <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="catalogue.html">Catalogue</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="register.html">Signup</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * @class DashboardNav
 */
class DashboardNav extends React.Component {
    render() {
        return (
          <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top user-nav fav-navbar d-none d-md-block">
            <NavLink to='/' className="navbar-brand">More Recipe</NavLink>
        
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="user-nav-collapse collapse navbar-collapse" id = "navbarCollapse">
              <ul className="navbar-nav ml-auto bg-dark flex-column" id="navigation">
                <li className="nav-item active">
                  <Link to='/dashboard' className="nav-link sidebar">Dashboard<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                  <Link to='/add_recipe' className="nav-link sidebar">Add Recipes</Link>
                </li>
                <li className="nav-item">
                  <Link to='/view_recipes' className="nav-link sidebar">View Recipes</Link>
                </li>

                <li className="nav-item">
                  <Link to='/favourites' className="nav-link sidebar">Favourites</Link>
                </li>

                <li className="nav-item">
                  <Link to='/user_profile' className="nav-link sidebar">User Profile</Link>
                </li>
              </ul>
            </div>      
          </nav>

          <nav className="navbar navbar-expand-md navbar-light fixed-top navigationBar d-md-none">
              <div className = "container-fluid">
                <NavLink to='/' className="navbar-brand" href="#">My Recipe Logo</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                    <li>
                      <form className="form-inline mt-2 ml-auto mt-md-0 d-md-none">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                      </form>
                    </li>
                    <li className="nav-item active">
                    <Link to='/' className="nav-link sidebar" >Dashboard<span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/dashboard/add_recipe' className="nav-link sidebar">Add Recipes</Link>
                    </li>
                    <li className="nav-item">
                      <Link to='/dashboard/view_recipes' className="nav-link sidebar">View Recipes</Link>
                    </li>

                    <li className="nav-item">
                      <Link to='/dashboard/favourites' className="nav-link sidebar" >Favourites</Link>
                    </li>

                    <li className="nav-item">
                      <Link to='/dashboard/user_profile' className="nav-link sidebar">User Profile</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </header>
        )
    }
}

export default DashboardNav;
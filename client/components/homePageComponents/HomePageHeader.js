import React from 'react';

class HomePageHeader extends React.Component {
    render() {
        return (
            <header>
              {/*Navigation*/}
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

              <div id="featured" className="carousel fade" data-ride="carousel">
                <ol className="carousel-indicators">
                <li data-target="#featured" data-slide-to="0" className="active"></li>
                <li data-target="#featured" data-slide-to="1"></li>
                <li data-target="#featured" data-slide-to="2"></li>
                <li data-target="#featured" data-slide-to="3"></li>
                </ol>

                <div className="carousel-inner fullheight">
                  <div className="carousel-item active">
                      <img className="d-block w-100" src="images/recipe26.jpg" alt="First slide" />
                      <div className="carousel-caption carousel-caption-search">
                        <h3 className = "search-header">Find More Recipes</h3>
                        <form className="form-inline my-2 my-lg-0">
                          <input className="form-control form-control-lg mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                          <button className="btn btn-success btn btn-lg my-2 my-sm-0" type="submit">Search</button>
                        </form>
                      </div>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block w-100" src="images/recipe7.jpg" alt="Second slide" />
                    <div className="carousel-caption carousel-caption-search">
                      <h3 className = "search-header">Find More Recipes</h3>
                      <form className="form-inline my-2 my-lg-0">
                        <input className="form-control form-control-lg mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-success btn btn-lg my-2 my-sm-0" type="submit">Search</button>
                      </form>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block w-100" src="images/recipe27.jpg" alt="Third slide" />
                    <div className="carousel-caption carousel-caption-search">
                      <h3 className = "search-header">Find More Recipes</h3>
                      <form className="form-inline my-2 my-lg-0">
                        <input className="form-control form-control-lg mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-success btn btn-lg my-2 my-sm-0" type="submit">Search</button>
                      </form>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <img className="d-block w-100" src="images/recipe15.jpg" alt="Third slide" />
                    <div className="carousel-caption carousel-caption-search">
                      <h3 className = "search-header">Find More Recipes</h3>
                      <form className="form-inline my-2 my-lg-0">
                        <input className="form-control form-control-lg mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-success btn btn-lg my-2 my-sm-0" type="submit">Search</button>
                      </form>
                    </div>  
                  </div>
                </div>
              </div>
            </header>
        )
    }
}

export default HomePageHeader;

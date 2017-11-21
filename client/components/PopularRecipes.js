import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class PopularRecipes
 */
class PopularRecipes extends React.Component {
  render() {
    return (
      <div className = "container">
        <div className = "row">
          <div className = "col-sm">
            <h2 className = "text-center popular">Popular</h2>
          </div>
        </div>

        <div className = "row popular-content">
          <div className = "col-12 col-sm-6 col-md-4 col-lg-3 recipes">
            <div className="card recipe-card" style={{border: 'none'}}>
              <img className="card-img-top img-fluid" src="images/recipe5.jpg" alt="Card image cap" style = {{height: 200 + 'px'}} />
              <div className="card-body">
                <h4 className="card-title">Recipe name</h4>
                <p className="card-text">
                  <div className = "row">
                    <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-6" aria-hidden="true"></i>10</a>
                    <a href="#" className = "text-info"><i className="fa fa-comment col-6" aria-hidden="true"></i>25</a>
                    <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-6" aria-hidden="true"></i>3</a>
                  </div>
                </p>
                <Link to='/details' className="btn btn-info">view details</Link>
              </div>
            </div>
          </div>

          <div className = "col-12 col-sm-6 col-md-4 col-lg-3 recipes">
            <div className="card recipe-card" style={{border: 'none'}}>
              <img className="card-img-top img-fluid" src="images/recipe2.jpg" alt="Card image cap" style = {{height: 200 + 'px'}} /> 
              <div className="card-body">
                <h4 className="card-title">Recipe name</h4>
                <p className="card-text">
                  <div className = "row">
                    <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-6" aria-hidden="true"></i>10</a>
                    <a href="#" className = "text-info"><i className="fa fa-comment col-6" aria-hidden="true"></i>25</a>
                    <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-6" aria-hidden="true"></i>3</a>
                  </div>
                </p>
                <Link to='/details' className="btn btn-info">view details</Link>
              </div>
            </div>
          </div>
          <div className = "col-12 col-sm-6 col-md-4 col-lg-3 recipes">
            <div className="card recipe-card" style={{border: 'none'}}>
              <img className="card-img-top img-fluid" src="images/recipe3.jpg" alt="Card image cap" style = {{height: 200 + 'px'}} />
              <div className="card-body">
                <h4 className="card-title">Recipe name</h4>
                <p className="card-text">
                  <div className = "row">
                    <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-6" aria-hidden="true"></i>10</a>
                    <a href="#" className = "text-info"><i className="fa fa-comment col-6" aria-hidden="true"></i>25</a>
                    <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-6" aria-hidden="true"></i>3</a>
                  </div>
                </p>
                <Link to='/details' className="btn btn-info">view details</Link>
              </div>
            </div>
          </div>

          <div className = "col-12 col-sm-6 col-md-4 col-lg-3 recipes d-md-none d-lg-block">
            <div className="card recipe-card" style={{border: 'none'}}>
              <img className="card-img-top img-fluid" src="images/recipe3.jpg" alt="Card image cap" style = {{height: 200 + 'px'}} />
              <div className="card-body">
                <h4 className="card-title">Recipe name</h4>
                <p className="card-text">
                  <div className = "row">
                    <a href="#" className = "text-success"><i className="fa fa-thumbs-up col-6" aria-hidden="true"></i>10</a>
                    <a href="#" className = "text-info"><i className="fa fa-comment col-6" aria-hidden="true"></i>25</a>
                    <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-6" aria-hidden="true"></i>3</a>
                  </div>
                </p>
                <Link to='/details' className="btn btn-info">view details</Link>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

export default PopularRecipes;
import React from 'react';
import { Link } from 'react-router-dom';

const LatestRecipes = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm">
        <h2 className="text-center latest">Latest Recipes</h2>
      </div>
    </div>

    <div className="row">
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 recipes">
        <div
          className="card recipe-card recipe-card"
          style={{ border: 'none' }}
        >
          <img
            className="card-img-top img-fluid"
            src="images/recipe5.jpg"
            alt="Card cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <h4 className="card-title">Recipe name</h4>
            <span className="card-text">
              <span className="row">
                <Link to="#" className="text-success">
                  <i className="fa fa-thumbs-up col-4" aria-hidden="true" />10
                </Link>
                <Link to="#" className="text-info">
                  <i className="fa fa-comment col-4" aria-hidden="true" />25
                </Link>
                <Link to="#" className="text-danger">
                  <i className="fa fa-thumbs-down col-4" aria-hidden="true" />3
                </Link>
              </span>
            </span>
            <Link to="/details" className="btn btn-info">view details</Link>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 recipes">
        <div className="card recipe-card" style={{ border: 'none' }}>
          <img
            className="card-img-top img-fluid"
            src="images/recipe2.jpg"
            alt="Card cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <h4 className="card-title">Recipe name</h4>
            <span className="card-text">
              <span className="row">
                <Link to="#" className="text-success">
                  <i className="fa fa-thumbs-up col-6" aria-hidden="true" />10
                </Link>
                <Link to="#" className="text-info">
                  <i className="fa fa-comment col-6" aria-hidden="true" />25
                </Link>
                <Link to="#" className="text-danger">
                  <i className="fa fa-thumbs-down col-6" aria-hidden="true" />3
                </Link>
              </span>
            </span>
            <Link to="/details" className="btn btn-info">view details</Link>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 col-lg-3 recipes">
        <div className="card recipe-card" style={{ border: 'none' }}>
          <img
            className="card-img-top img-fluid"
            src="images/recipe3.jpg"
            alt="Card cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <h4 className="card-title">Recipe name</h4>
            <span className="card-text">
              <span className="row">
                <Link to="#" className="text-success">
                  <i className="fa fa-thumbs-up col-6" aria-hidden="true" />10
                </Link>
                <Link to="#" className="text-info">
                  <i className="fa fa-comment col-6" aria-hidden="true" />25
                </Link>
                <Link to="#" className="text-danger">
                  <i className="fa fa-thumbs-down col-6" aria-hidden="true" />3
                </Link>
              </span>
            </span>
            <Link to="/details" className="btn btn-info">view details</Link>
          </div>
        </div>
      </div>

      <div
        className="col-12 col-sm-6 col-md-4 col-lg-3 recipes d-md-none d-lg-block"
      >
        <div className="card recipe-card" style={{ border: 'none' }}>
          <img
            className="card-img-top img-fluid"
            src="images/recipe4.jpg"
            alt="Card cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <h4 className="card-title">Recipe name</h4>
            <span className="card-text">
              <span className="row">
                <Link to="#" className="text-success">
                  <i className="fa fa-thumbs-up col-6" aria-hidden="true" />10
                </Link>
                <Link to="#" className="text-info">
                  <i className="fa fa-comment col-6" aria-hidden="true" />25
                </Link>
                <Link
                  to="#"
                  className="text-danger"
                ><i className="fa fa-thumbs-down col-6" aria-hidden="true" />3
                </Link>
              </span>
            </span>
            <Link to="/details" className="btn btn-info">view details</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LatestRecipes;

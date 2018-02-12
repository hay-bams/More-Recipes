import React from 'react';
import { Link } from 'react-router-dom';

const PopularRecipes = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm">
        <h2 className="text-center popular">Popular</h2>
      </div>
    </div>

    <div className="row popular-content">
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 recipes">
        <div className="card recipe-card" style={{ border: 'none' }}>
        <h4 className="card-header headerColor text-center">Recipe name</h4>
          <img
            className="card-img-top img-fluid"
            src="images/recipe5.jpg"
            alt="Card cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <span className="card-text">
              <div className="row ml-1">
                <Link to="#" className="text-success">
                  <i className="fa fa-thumbs-up col-6" aria-hidden="true" />10
                </Link>
                <Link to="#" className="text-info">
                  <i className="fa fa-comment col-6" aria-hidden="true" />25
                </Link>
                <Link to="#" className="text-danger">
                  <i className="fa fa-thumbs-down col-6" aria-hidden="true" />3
                </Link>
              </div>
            </span>
            <Link to="/details" className="btn btn-info ml-5">details</Link>
          </div>
        </div>
      </div>

       <div className="col-12 col-sm-6 col-md-4 col-lg-3 recipes">
        <div className="card recipe-card" style={{ border: 'none' }}>
        <h4 className="card-header headerColor text-center text-center">Recipe name</h4>
          <img
            className="card-img-top img-fluid"
            src="images/recipe5.jpg"
            alt="Card cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <span className="card-text">
              <div className="row ml-1">
                <Link to="#" className="text-success">
                  <i className="fa fa-thumbs-up col-6" aria-hidden="true" />10
                </Link>
                <Link to="#" className="text-info">
                  <i className="fa fa-comment col-6" aria-hidden="true" />25
                </Link>
                <Link to="#" className="text-danger">
                  <i className="fa fa-thumbs-down col-6" aria-hidden="true" />3
                </Link>
              </div>
            </span>
            <Link to="/details" className="btn btn-info ml-5">details</Link>
          </div>
        </div>
      </div>

       <div className="col-12 col-sm-6 col-md-4 col-lg-3 recipes">
        <div className="card recipe-card" style={{ border: 'none' }}>
        <h4 className="card-header headerColor text-center">Recipe name</h4>
          <img
            className="card-img-top img-fluid"
            src="images/recipe5.jpg"
            alt="Card cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <span className="card-text">
              <div className="row ml-1">
                <Link to="#" className="text-success">
                  <i className="fa fa-thumbs-up col-6" aria-hidden="true" />10
                </Link>
                <Link to="#" className="text-info">
                  <i className="fa fa-comment col-6" aria-hidden="true" />25
                </Link>
                <Link to="#" className="text-danger">
                  <i className="fa fa-thumbs-down col-6" aria-hidden="true" />3
                </Link>
              </div>
            </span>
            <Link to="/details" className="btn btn-info ml-5">details</Link>
          </div>
        </div>
      </div>

       <div className="col-12 col-sm-6 col-md-4 col-lg-3 recipes">
        <div className="card recipe-card" style={{ border: 'none' }}>
        <h4 className="card-header headerColor text-center">Recipe name</h4>
          <img
            className="card-img-top img-fluid"
            src="images/recipe5.jpg"
            alt="Card cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <span className="card-text">
              <div className="row ml-1">
                <Link to="#" className="text-success">
                  <i className="fa fa-thumbs-up col-6" aria-hidden="true" />10
                </Link>
                <Link to="#" className="text-info">
                  <i className="fa fa-comment col-6" aria-hidden="true" />25
                </Link>
                <Link to="#" className="text-danger">
                  <i className="fa fa-thumbs-down col-6" aria-hidden="true" />3
                </Link>
              </div>
            </span>
            <Link to="/details" className="btn btn-info ml-5">details</Link>
          </div>
        </div>
      </div>
    </div>

  </div>
);

export default PopularRecipes;

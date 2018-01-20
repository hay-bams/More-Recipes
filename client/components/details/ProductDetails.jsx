import React from 'react';
import { Link } from 'react-router-dom';

const ProductDetails = () => (
  <div className="container">
    <div className="row">
      <div className="col-sm-12">
        <h2 className="details">Food Name Goes Here</h2>
      </div>

      <div className="col-sm-6 recipe-img">
        <img
          className="recipe-details img-fluid"
          src="images/recipe2.jpg"
          alt="Details"
        />
        <div className="row">
          <Link to="#" className="text-success">
            <i className="fa fa-thumbs-up col-4" aria-hidden="true" />10
          </Link>
          <Link to="#" className="text-info">
            <i className="fa fa-comment col-4" aria-hidden="true" />25
          </Link>
          <Link to="#" className="text-danger">
            <i className="fa fa-thumbs-down col-4" aria-hidden="true" />3
          </Link>
          <Link to="#" className="btn btn-success">upvote
            <i className="fa fa-thumbs-up" aria-hidden="true" />
          </Link>
          <Link to="#" className="btn btn-danger">downvote
            <i className="fa fa-thumbs-down" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="col-sm-6">
        <h3 className="text-center">Ingredients</h3>
        <p>
          salt, sugar, lorem,ipsum,dolor, exercitations,maggi, red oil, tomatoe
        </p>
        <h3 className="text-center preparation">Preparations</h3>
        <p>(1). Lorem ipsum dolor sit amet, consectetur adipiscing elit,
           sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.<br />
          (2). Ut enim ad minim veniam, quis nostrud exercitation
           ullamco laboris nisi ut aliquip ex ea commodo consequat.
          <br />
          (3). Duis aute irure dolor in reprehenderit in voluptate velit
           esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia
             deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  </div>

);

export default ProductDetails;

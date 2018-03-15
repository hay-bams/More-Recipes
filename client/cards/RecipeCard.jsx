import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const RecipeCard = props =>
  (
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3 recipes"
      key={props.id}
    >

      <div
        className="card recipe-card recipe-trans card-height"
        style={{ border: 'none' }}
      >
        <h4 className="card-header headerColor text-center truncate-header">
          {props.title}
        </h4>
        <img
          className="card-img-top img-fluid img-recipe"
          src={props.image}
          alt="Card  cap"
          style={{ height: `${200}px` }}
        />
        <div className="card-body">
          <p className="truncate">{props.instructions.slice(1, 60)}</p>
          <span className="card-text">
            <span className="row ml-1">
              <span className="text-success">
                <i
                  className="fa fa-thumbs-up col-4"
                  aria-hidden="true"
                />{props.upvotes}
              </span>
              <span className="text-info">
                <i
                  className="fa fa-eye col-4"
                  aria-hidden="true"
                /> {props.views}
              </span>
              <span className="text-danger">
                <i
                  className="fa fa-thumbs-down col-4"
                  aria-hidden="true"
                />{props.downvotes}
              </span>
            </span>
          </span>
          <Link
            id="viewDetails"
            to={`/details/${props.id}`}
            className="btn btn-outline-info row ml-4"
          >view details
          </Link>
        </div>
      </div>
    </div>
  );

export default RecipeCard;

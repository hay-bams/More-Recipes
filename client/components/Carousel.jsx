import React from 'react';
import carouselImage from '../images/recipe26.jpg';

const Carousel = () => (
  <div id="featured" className="carousel fade" data-ride="carousel">
    <div className="carousel-inner fullheight">
      <div className="carousel-item active">
        <img
          className="d-block w-100"
          src={carouselImage}
          alt="First slide"
        />
        <div className="carousel-caption carousel-caption-search">
          <h3 className="search-header">Find More Recipes</h3>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control form-control-lg mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-success btn btn-lg my-2 my-sm-0"
              type="submit"
            >Search
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Carousel;

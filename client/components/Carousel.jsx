import React from 'react';

const Carousel = () => (
  <div id="featured" className="carousel fade" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#featured" data-slide-to="0" className="active" />
      <li data-target="#featured" data-slide-to="1" />
      <li data-target="#featured" data-slide-to="2" />
      <li data-target="#featured" data-slide-to="3" />
    </ol>

    <div className="carousel-inner fullheight">
      <div className="carousel-item active">
        <img
          className="d-block w-100"
          src="images/recipe26.jpg"
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
      <div className="carousel-item">
        <img
          className="d-block w-100"
          src="images/recipe7.jpg"
          alt="Second slide"
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
      <div className="carousel-item">
        <img
          className="d-block w-100"
          src="images/recipe27.jpg"
          alt="Third slide"
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

      <div className="carousel-item">
        <img
          className="d-block w-100"
          src="images/recipe15.jpg"
          alt="Third slide"
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

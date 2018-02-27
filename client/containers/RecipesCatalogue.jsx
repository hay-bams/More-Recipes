import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { bindActionCreators } from 'redux';
import { getAllRecipes } from '../actions/actions';

import recipeImage from '../images/recipe24.jpg';

/**
 * @class RecipeCatalogue
 */
class RecipeCatalogue extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderCatalogue = this.renderCatalogue.bind(this);
  }
  /**
   * @return {void} componentDidMount
   */
  componentDidMount() {
    this.props.getAllRecipes(1);
  }

  /**
   * @param {obj} data
   * @returns {void} handlePageClick
   */
  handlePageClick(data) {
    const selected = data.selected + 1;
    this.props.getAllRecipes(selected);
  }

  /**
   * @returns {obj} renderCatalogue
   */
  renderCatalogue() {
    const { recipes } = this.props;
    return recipes.map(recipe => (
      <div
        className="col-12 col-sm-6 col-md-4 col-lg-3 recipes"
        key={recipe.id}
      >
        <div className="card recipe-card" style={{ border: 'none' }}>
          <h4 className="card-header headerColor text-center">{recipe.title}</h4>
          <img
            className="card-img-top img-fluid img-recipe"
            src={recipe.image}
            alt="Card  cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
          <p>{recipe.instructions.slice(1, 60)}</p>
            <span className="card-text">
              <span className="row ml-1">
                <span className="text-success">
                  <i
                    className="fa fa-thumbs-up col-4"
                    aria-hidden="true"
                  />{recipe.upvotes}
                </span>
                <span className="text-info">
                  <i className="fa fa-comment col-4" aria-hidden="true" />25
                </span>
                <span className="text-danger">
                  <i
                    className="fa fa-thumbs-down col-4"
                    aria-hidden="true"
                  />{recipe.downvotes}
                </span>
              </span>
            </span>
            <Link to={`/details/${recipe.id}`} className="btn btn-outline-info ml-4">view details</Link>
          </div>
        </div>
      </div>
    ));
  }

  /**
   * @returns {obj} render
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h2 className="text-center catalogue">Recipes Catalogue</h2>
          </div>
        </div>

        <div className="row">
          {this.renderCatalogue()}
        </div>

        <div className="row">
          <div className="col-md-8 ml-auto">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel={<a href="">...</a>}
              breakClassName="page-link"
              pageCount={this.props.pages}
              onPageChange={this.handlePageClick}
              containerClassName="pagination pagination-md"
              pageLinkClassName="page-link"
              nextLinkClassName="page-link"
              previousLinkClassName="page-link"
              disabledClassName="disabled"
              pageClassName="page-item"
              previousClassName="page-item"
              nextClassName="page-item"
              activeClassName="active"
              subContainerClassName="pages pagination"
            />
          </div>
        </div>
      </div>
    );
  }
}

RecipeCatalogue.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape({
    upvotes: PropTypes.number,
    downvotes: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    instructions: PropTypes.string,
    ingredients: PropTypes.string,
    userId: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string
  })).isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes.rows,
  pages: state.recipes.pages
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getAllRecipes },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(RecipeCatalogue);

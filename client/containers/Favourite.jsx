import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactPaginate from 'react-paginate';
import { bindActionCreators } from 'redux';
import { getFavouriteRecipes, deleteFavoriteRecipe } from '../actions/recipe';

/**
 * @class FavouriteRecipes
 */
export class FavouriteRecipes extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderFavouriteRecipes = this.renderFavouriteRecipes.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  /**
   * @return {void} componentWillMount
   */
  componentWillMount() {
    this.props.getFavouriteRecipes(1);
  }

  /**
   * @param {number} recipeId
   * @return {void} onDelete
   */
  onDelete(recipeId) {
    this.props.deleteFavoriteRecipe(recipeId);
  }

  /**
   * @param {obj} page
   * @returns {void} handlePageClick
   */
  handlePageClick(page) {
    const selected = page.selected + 1;
    this.props.getFavouriteRecipes(selected);
  }

  /**
   *
   * @param {obj} event
   * @returns {obj} showModal
   */
  showModal(event) {
    const recipeId = parseInt(event.target.id, 10);
    return (confirmAlert({
      title: 'Confirm Delete',
      message: 'Are you sure to delete this recipe ?',
      confirmLabel: 'Yes',
      cancelLabel: 'No',
      onConfirm: () => this.onDelete(recipeId),
      onCancel: () => '',
    })
    );
  }

  /**
   * @returns {obj} renderRecipe
   */
  renderFavouriteRecipes() {
    const { favouriteRecipes } = this.props;
    return favouriteRecipes.length === 0 ?
      <div className="mx-auto">
        <p className="text-center">
        You do not have any favorite recipe at the moment.
        </p>
      </div> :
      favouriteRecipes.map(favouriteRecipe => (
        <div
          className="col-12 col-sm-6 col-md-6 col-lg-4 recipes"
          key={favouriteRecipe.id}
        >
          <div className="card recipe-card" style={{ border: 'none' }}>
            <img
              className="card-img-top img-fluid img-recipe"
              src={favouriteRecipe.image}
              alt="Card  cap"
              style={{ height: `${200}px` }}
            />
            <div className="card-body mx-auto">
              <h4 className="card-title text-center">{favouriteRecipe.title}</h4>
              <p className="card-text">
                <span className="row">
                  <span href="#" className="text-success">
                    <i
                      className="fa fa-thumbs-up col-4"
                      aria-hidden="true"
                    />{favouriteRecipe.upvotes}
                  </span>
                  <span href="#" className="text-info">
                    <i className="fa fa-eye text-info col-4" aria-hidden="true" /> {favouriteRecipe.views}
                  </span>
                  <span href="#" className="text-danger">
                    <i
                      className="fa fa-thumbs-down col-4"
                      aria-hidden="true"
                    />{favouriteRecipe.downvotes}
                  </span>
                </span>
              </p>
              <Link to={`/details/${favouriteRecipe.id}`} className="btn btn-outline-info" style={{ marginLeft: `${5}px` }}>
               View
              </Link>

              <button className="btn btn-outline-info ml-2" id={favouriteRecipe.id} onClick={this.showModal}>
                Remove
              </button>
            </div>
          </div>
        </div>


      ));
  }

  /**
   * @returns {void} render
   */
  render() {
    return (
      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h2 className="text-center catalogue">My Favorite Recipes</h2>
              <h3 className="text-center">{this.message}</h3>
            </div>
          </div>
          <div className="row">
            {this.renderFavouriteRecipes()}
          </div>

          <div className="row">
            <div className="col-md-8 ml-auto">
              { this.props.favouriteRecipes.length > 0 ?
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
                /> : ''
          }
            </div>
          </div>

        </div>
      </div>
    );
  }
}

FavouriteRecipes.defaultProps = {
  pages: 1
};

FavouriteRecipes.propTypes = {
  getFavouriteRecipes: PropTypes.func.isRequired,
  deleteFavoriteRecipe: PropTypes.func.isRequired,
  favouriteRecipes: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  pages: PropTypes.number
};

const mapStateToProps = state => ({
  favouriteRecipes: state.favouriteRecipes.rows,
  pages: state.favouriteRecipes.pages,
  errorMsg: state.errors.addFavoriteError
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getFavouriteRecipes, deleteFavoriteRecipe },
  dispatch
);

const ConnectedFavouriteRecipe =
  connect(mapStateToProps, mapDispatchToProps)(FavouriteRecipes);


export default ConnectedFavouriteRecipe;


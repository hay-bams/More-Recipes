import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { bindActionCreators } from 'redux';
import { getFavouriteRecipes } from '../actions/actions';

/**
 * @class FavouriteRecipes
 */
class FavouriteRecipes extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderFavouriteRecipes = this.renderFavouriteRecipes.bind(this);
  }
  /**
   * @return {void} componentDidMount
   */
  componentWillMount() {
    this.props.getFavouriteRecipes(1);
  }

  /**
   * @param {obj} data
   * @returns {void} handlePageClick
   */
  handlePageClick(data) {
    const selected = data.selected + 1;
    this.props.getFavouriteRecipes(selected);
  }

  /**
   * @returns {obj} renderRecipe
   */
  renderFavouriteRecipes() {
    const { favouriteRecipes } = this.props;
    return favouriteRecipes.map(favouriteRecipe => (
      <div
        className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes"
        key={favouriteRecipe.id}
      >
        <div className="card recipe-card" style={{ border: 'none' }}>
          <img
            className="card-img-top img-fluid"
            src="../images/recipe22.jpg"
            alt="Card  cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <h4 className="card-title">{favouriteRecipe.title}</h4>
            <p className="card-text">
              <span className="row">
                <a href="#" className="text-success">
                  <i
                    className="fa fa-thumbs-up col-4"
                    aria-hidden="true"
                  />{favouriteRecipe.upvotes}
                </a>
                <a href="#" className="text-info">
                  <i className="fa fa-comment col-4" aria-hidden="true" />
                </a>
                <a href="#" className="text-danger">
                  <i
                    className="fa fa-thumbs-down col-4"
                    aria-hidden="true"
                  />{favouriteRecipe.downvotes}
                </a>
              </span>
            </p>
            <Link to={`/view_recipes/${favouriteRecipe.id}`} className="btn btn-info">
              <i className="fa fa-eye" aria-hidden="true" />
            </Link>
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
              <h2 className="text-center catalogue">My Favourite Recipes</h2>
              <h3 className="text-center">{this.message}</h3>
            </div>
          </div>
          <div className="row">
            {this.renderFavouriteRecipes()}
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
                containerClassName="pagination pagination-lg"
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
      </div>
    );
  }
}

FavouriteRecipes.propTypes = {
  getFavouriteRecipes: PropTypes.func.isRequired,
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

const mapStateToProps = state => ({
  favouriteRecipes: state.favouriteRecipes.rows,
  pages: state.favouriteRecipes.pages
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getFavouriteRecipes },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(FavouriteRecipes);


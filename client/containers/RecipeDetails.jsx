import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  upvoteRecipe, getSingleRecipe, downvoteRecipe, addFavoriteRecipe
} from '../actions/recipe';

/**
 *@class ProductDetails
 */
export class RecipeDetails extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.state = {};
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.addFavourite = this.addFavourite.bind(this);
  }

  /**
   * @returns {void} componentWillMount
   */
  componentWillMount() {
    const id = parseInt(this.props.match.params.id, 10);
    this.props.getSingleRecipe(id);
  }


  /**
   * @param {obj} event
   * @returns {void} upvote
   */
  upvote(event) {
    event.preventDefault();
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.props.upvoteRecipe(this.props.recipe.id);
    } else {
      toastr.warning('you must be signed in');
      this.props.history.push('/signin');
    }
  }

  /**
   * @param {obj} event
   * @returns {void} downvote
   */
  downvote(event) {
    event.preventDefault();
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      this.props.downvoteRecipe(this.props.recipe.id, this.props.userData.user.id);
    } else {
      toastr.warning('you must be signed in');
      this.props.history.push('/signin');
    }
  }

  /**
   * @param {obj} event
   * @returns {void} addFavorite
   */
  addFavourite(event) {
    event.preventDefault();
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      const { recipe } = this.props;
      this.props.addFavoriteRecipe(recipe.id);
    } else {
      toastr.warning('you must be signed in');
      this.props.history.push('/signin');
    }
  }

  /**
   * @returns {obj} render
   */
  render() {
    const { recipe } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="details">{recipe.title}</h2>
          </div>

          <div className="col-lg-6 recipe-img">
            <img
              className="recipe-details img-fluid"
              src={recipe.image}
              alt="Details"
            />
            <a
              onClick={this.upvote}
              href="#"
              className="btn btn-outline-dark"
              id="upvote"
            >
              <i className="fa fa-thumbs-up" aria-hidden="true" />
              {recipe.upvotes}
            </a>

            <a
              onClick={this.downvote}
              href="#"
              className="btn btn-outline-dark"
              style={{ marginLeft: `${5}px` }}
              id="downvote"
            >
              <i className="fa fa-thumbs-down" aria-hidden="true" />
              {recipe.downvotes}
            </a>

            <a
              onClick={this.addFavourite}
              href="#"
              className="btn btn-outline-dark"
              style={{ marginLeft: `${5}px` }}
              id="favourite"
            >
              <i className="fa fa-heart" aria-hidden="true" />
            </a>
          </div>

          <div className="col-lg-6">
            <h3 className="">Ingredients</h3>
            <p>{recipe.ingredients}</p>
            <h3 className="preparation">Preparations</h3>
            <p>{recipe.instructions}</p>
          </div>
        </div>
      </div>

    );
  }
}

RecipeDetails.propTypes = {
  userData: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number
    })
  }).isRequired,
  addFavoriteRecipe: PropTypes.func.isRequired,
  getSingleRecipe: PropTypes.func.isRequired,
  upvoteRecipe: PropTypes.func.isRequired,
  downvoteRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.shape({
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
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.funct
  }).isRequired
};

const mapStateToProps = state => ({
  recipe: state.singleRecipe,
  userData: state.userData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    upvoteRecipe, getSingleRecipe, downvoteRecipe, addFavoriteRecipe
  }, dispatch);


const ConnectedRecipeDetails =
  connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);

export default ConnectedRecipeDetails;

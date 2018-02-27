import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserRecipes, deleteRecipe } from '../actions/actions';

/**
 * @class Recipes
 */
class Recipes extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.onDelete = this.onDelete.bind(this);
    this.showModal = this.showModal.bind(this);
    this.userRecipes = [];
  }
  /**
   * @returns {void} componentDidMount
   */
  componentDidMount() {
    this.props.getUserRecipes();
  }

  /**
   * @param {number} id
   * @return {void} onDelete
   */
  onDelete(id) {
    this.props.deleteRecipe(id);
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
  renderRecipe() {
    const { userRecipes } = this.props;
    return userRecipes.length === 0 ?
      <div className="mx-auto">
        <p className="text-center">You do not have any recipe at the moment.
          <Link to="/add_recipe"> create recipe here</Link>
        </p>
      </div> :
      userRecipes.map(recipe => (
        <div
          className="col-12 col-sm-6 col-md-6 col-lg-4 recipes"
          key={recipe.id}
        >

          <div className="card recipe-card" style={{ border: 'none' }}>
            <img
              className="card-img-top img-fluid img-recipe"
              src={recipe.image}
              alt="Card  cap"
              style={{ height: `${200}px` }}
            />
            <div className="card-body mx-auto">
              <h4 className="card-title text-center">{recipe.title}</h4>
              <p className="card-text">
                <span className="row">
                  <span href="#" className="text-success">
                    <i
                      className="fa fa-thumbs-up col-4"
                      aria-hidden="true"
                    />{recipe.upvotes}
                  </span>
                  <span href="#" className="text-info">
                    <i className="fa fa-comment col-4" aria-hidden="true" />
                  </span>
                  <span href="#" className="text-danger">
                    <i
                      className="fa fa-thumbs-down col-4"
                      aria-hidden="true"
                    />{recipe.downvotes}
                  </span>
                </span>
              </p>
              <Link to={`/edit_recipes/${recipe.id}`} className="btn btn-outline-info edit" style={{ marginLeft: `${5}px` }}>
                <i className="fa fa-pencil-square-o" aria-hidden="true" />
              </Link>
              <button className="btn btn-outline-info delete" id={recipe.id} onClick={this.showModal} style={{ marginLeft: `${5}px` }}>
                <i className="fa fa-trash-o" aria-hidden="true" id={recipe.id} />
              </button>
              <Link to={`/view_recipes/${recipe.id}`} className="btn btn-outline-info view" style={{ marginLeft: `${5}px` }}>
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
              <h2 className="text-center catalogue">My Recipes</h2>
            </div>
          </div>
          <div className="row">
            {this.renderRecipe()}
          </div>
        </div>
      </div>
    );
  }
}

Recipes.propTypes = {
  getUserRecipes: PropTypes.func.isRequired,
  userRecipes: PropTypes.arrayOf(PropTypes.shape({
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
  deleteRecipe: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userRecipes: state.userRecipes.rows
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getUserRecipes, deleteRecipe },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);


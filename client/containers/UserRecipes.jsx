import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getUserRecipes } from '../actions/actions';

/**
 * @class Recipes
 */
class Recipes extends React.Component {
  /**
   * @returns {void} componentDidMount
   */
  componentDidMount() {
    this.props.getUserRecipes();
  }

  /**
   * @returns {obj} renderRecipe
   */
  renderRecipe() {
    // console.log(this.props.getUserRecipes())
    const userRecipe = _.mapKeys(this.props.userRecipes, 'id');
    return _.map(userRecipe, recipe => (
      <div
        className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 recipes"
        key={recipe.id}
      >
        <div className="card recipe-card" style={{ border: 'none' }}>
          <img
            className="card-img-top img-fluid"
            src="../images/recipe22.jpg"
            alt="Card  cap"
            style={{ height: `${200}px` }}
          />
          <div className="card-body">
            <h4 className="card-title">{recipe.title}</h4>
            <p className="card-text">
              <span className="row">
                <a href="#" className="text-success">
                  <i
                    className="fa fa-thumbs-up col-4"
                    aria-hidden="true"
                  />{recipe.upvotes}
                </a>
                <a href="#" className="text-info">
                  <i className="fa fa-comment col-4" aria-hidden="true" />
                </a>
                <a href="#" className="text-danger">
                  <i
                    className="fa fa-thumbs-down col-4"
                    aria-hidden="true"
                  />{recipe.downvotes}
                </a>
              </span>
            </p>
            <span className="btn btn-primary">
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <span className="btn btn-danger">
              <i className="fa fa-trash-o" aria-hidden="true" />
            </span>
            <span className="btn btn-info">
              <i className="fa fa-eye" aria-hidden="true" />
            </span>
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
      <div className="main-userboard-body">
        <div className="container-fluid">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">View Recipe</li>
          </ol>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                {this.renderRecipe()}
              </div>
            </div>
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
  })).isRequired
};

const mapStateToProps = state => ({
  userRecipes: state.userRecipes
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getUserRecipes },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);


import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { getPopularRecipes } from '../actions/recipe';

/**
 * @class RecipeCatalogue
 */
class PopularRecipes extends React.Component {
  /**
   * @return {void} componentDidMount
   */
  componentDidMount() {
    this.props.getPopularRecipes();
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
                  <i className="fa fa-eye col-4" aria-hidden="true" /> {recipe.views}
                </span>
                <span className="text-danger">
                  <i
                    className="fa fa-thumbs-down col-4"
                    aria-hidden="true"
                  />{recipe.downvotes}
                </span>
              </span>
            </span>
            <Link to={`/details/${recipe.id}`} className="btn btn-outline-info row ml-4">view details</Link>
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
            <h2 className="text-center catalogue">Popular Recipes</h2>
          </div>
        </div>

        <div className="row">
          {this.renderCatalogue()}
        </div>
      </div>
    );
  }
}

PopularRecipes.propTypes = {
  getPopularRecipes: PropTypes.func.isRequired,
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
  recipes: state.popularRecipes.rows
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getPopularRecipes },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(PopularRecipes);

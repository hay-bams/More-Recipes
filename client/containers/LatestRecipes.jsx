import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { getLatestRecipes } from '../actions/recipe';
import RecipeCard from '../cards/RecipeCard';

/**
 * @class RecipeCatalogue
 */
export class LatestRecipes extends React.Component {
  /**
   * @return {void} componentDidMount
   */
  componentDidMount() {
    this.props.getLatestRecipes();
  }

  /**
   * @returns {obj} renderCatalogue
   */
  renderCatalogue() {
    const { recipes } = this.props;
    return recipes.map(recipe => (
      <RecipeCard {...recipe} key={recipe.id} />
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
            <h2 className="text-center catalogue">Latest Recipes</h2>
          </div>
        </div>

        <div className="row">
          {this.renderCatalogue()}
        </div>
      </div>
    );
  }
}

LatestRecipes.propTypes = {
  getLatestRecipes: PropTypes.func.isRequired,
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
  recipes: state.latestRecipes.rows
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getLatestRecipes },
  dispatch
);

const ConnectedLatestRecipes =
  connect(mapStateToProps, mapDispatchToProps)(LatestRecipes);


export default ConnectedLatestRecipes;


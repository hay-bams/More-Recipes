import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { getPopularRecipes } from '../actions/recipe';
import RecipeCard from '../cards/RecipeCard';

/**
 * @class RecipeCatalogue
 */
export class PopularRecipes extends React.Component {
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
const ConnectedPopularRecipes =
  connect(mapStateToProps, mapDispatchToProps)(PopularRecipes);

export default ConnectedPopularRecipes;

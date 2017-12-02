import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllRecipes }  from '../actions/actions.js';

/**
 * @class RecipeCatalogue
 */
class RecipeCatalogue extends React.Component {
  componentDidMount() {
    this.props.getAllRecipes()
  }

  renderCatalogue() {
    const allRecipes = _.mapKeys(this.props.recipes.data, 'id');
    return _.map(allRecipes, recipe => {
      return (
        <div className = "col-12 col-sm-6 col-md-4 col-lg-3 recipes" key={recipe.id}>
          <div className="card recipe-card" style={{border: 'none'}}>
            <img className="card-img-top img-fluid" src="images/recipe5.jpg" alt="Card image cap" style = {{height: 200 + 'px'}} />
            <div className="card-body">
              <h4 className="card-title">{recipe.title}</h4>
              <span className="card-text">
                <span className = "row">
                  <a href="#" className = "text-success">
                  <i className="fa fa-thumbs-up col-4" aria-hidden="true"></i>{recipe.upvotes}</a>
                  <a href="#" className = "text-info"><i className="fa fa-comment col-4" aria-hidden="true"></i>25</a>
                  <a href="#" className = "text-danger"><i className="fa fa-thumbs-down col-4" aria-hidden="true"></i>{recipe.downvotes}</a>
                </span>
              </span>
              <Link to='/details'  className="btn btn-info">view details</Link>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
      return (
        <div className = "container">
        <div className = "row">
          <div className = "col-sm">
            <h2 className = "text-center catalogue">Recipes Catalogue</h2>
          </div>
        </div>

        <div className = "row">
         {this.renderCatalogue()}
        </div>
      </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllRecipes }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(RecipeCatalogue);

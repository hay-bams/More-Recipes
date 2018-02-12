import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { addRecipe } from '../actions/actions';
import Authenticate from '../auth/auth';

/**
 * @class AddRecipeForm
 */
class AddRecipeForm extends React.Component {
  /**
   * @param {obj} event
   * @returns {void} clearForm
   */
  static clearForm(event) {
    event.target.title.value = '';
    event.target.ingredients.value = '';
    event.target.instructions.value = '';
  }

  /**
   * @param {obj} props
   * @returns {void} constructor
   */
  constructor(props) {
    super(props);
    this.addRecipe = this.addRecipe.bind(this);
    this.state = {
      errors: {},
      message: ''
    };
  }

  /**
   * @param {obj} event
   * @returns {void} addRecipe
   */
  addRecipe(event) {
    event.preventDefault();
    const recipe = {
      title: event.target.title.value,
      ingredients: event.target.ingredients.value,
      instructions: event.target.instructions.value,
      image: 'imageURl'
    };

    let errors = Authenticate.validateAddRecipe(recipe);

    if (errors.title !== '' || errors.ingredients !== '' ||
     errors.instructions) {
      return this.setState({ errors });
    }
    this.props.addRecipe(recipe);
    AddRecipeForm.clearForm(event);

    errors = {};
    this.setState({ errors, message: 'Recipe added Successfully' });
  }

  /**
   * @returns {obj} render
   */
  render() {
    const { errors, message } = this.state;
    return (
      <div className="main-userboard-body add-recipe-body">
        <div className="container">
          <div className="row">
            <div className="mx-auto col-sm-12 col-md-8 col-lg-8 col-xs mt-5">
              <span className="text-success">{message}</span>
              <h2 className="text-center"> Add Recipe</h2>
              <form onSubmit={this.addRecipe}>
                <div className="form-group">
                  <label htmlFor="food">Recipe Name</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg"
                    placeholder="Enter Recipe name"
                  />
                  { errors.title &&
                  <span className="help-block error text-danger">
                    {errors.title}
                  </span>
                    }
                </div>

                <div className="form-group">
                  <input type="file" />
                </div>

                <div className="form-group">
                  <label htmlFor="ingredient">Ingredients</label>
                  <input
                    ype="text"
                    name="ingredients"
                    className="form-control form-control-lg"
                    placeholder="Enter Ingredients"
                    id="ingredients"
                  />
                  { errors.ingredients &&
                    <span className="help-block error text-danger">
                      {errors.ingredients}
                    </span>
                    }
                </div>

                <div className="form-group">
                  <label htmlFor="instruction">Instructions</label>
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Enter Instructions"
                    name="instructions"
                    id="instructions"
                  />
                  { errors.instructions &&
                  <span className="help-block error text-danger">
                    {errors.instructions}
                  </span>
                    }
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Add Recipe"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


AddRecipeForm.defaultProps = {
  addRecipe: {}
};

AddRecipeForm.propTypes = {
  addRecipe: PropTypes.func
};


const mapStateToProps = state => ({
  recipes: state.recipes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addRecipe }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(AddRecipeForm);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { editRecipe } from '../actions/actions';
import Authenticate from '../auth/auth';

/**
 * @class EditRecipeForm
 */
class EditRecipeForm extends React.Component {
  /**
   * @param {obj} props
   * @returns {void} constructor
   */
  constructor(props) {
    super(props);
    this.editRecipe = this.editRecipe.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      recipe: {},
      errors: {}
    };
  }

  /**
   * @returns {void} componentWillMount
   */
  componentWillMount() {
    this.props.recipes.filter((recipe) => {
      if (recipe.id === parseInt(this.props.match.params.id, 10)) {
        this.setState({ recipe });
      }
    });
  }

  /**
   * @param {obj} event
   * @returns {void} onChange
   */
  onChange(event) {
    const recipe = {
      [event.target.name]: event.target.value
    };
    this.setState({ recipe });
  }

  /**
   * @param {obj} event
   * @returns {void} addRecipe
   */
  editRecipe(event) {
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

    this.props.editRecipe(recipe, this.props.match.params.id);
    // AddRecipeForm.clearForm(event);

    errors = {};
    this.setState({ errors });
  }

  /**
   * @returns {obj} render
   */
  render() {
    const { errors } = this.state;
    const { recipe } = this.state;
    return (
      <div className="main-userboard-body add-recipe-body">
        <div className="container">
          <div className="row">
            <div className="mx-auto col-sm-12 col-md-8 col-lg-6 col-xs mt-5">
              <h2 className="text-center"> Edit Recipe</h2>
              <form onSubmit={this.editRecipe}>
                <div className="form-group">
                  <label htmlFor="food">Recipe Name</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Enter Recipe name"
                    value={recipe.title}
                    onChange={this.onChange}
                  />
                  { errors.title &&
                  <span className="help-block text-danger error">
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
                    type="text"
                    name="ingredients"
                    className="form-control"
                    placeholder="Enter Ingredients"
                    value={recipe.ingredients}
                    onChange={this.onChange}
                  />
                  { errors.ingredients &&
                    <span className="help-block text-danger error">
                      {errors.ingredients}
                    </span>
                    }
                </div>

                <div className="form-group">
                  <label htmlFor="instruction">Instructions</label>
                  <textarea
                    className="form-control"
                    placeholder="Enter Instructions"
                    name="instructions"
                    id="instructions"
                    value={recipe.instructions}
                    onChange={this.onChange}
                  />
                  { errors.instructions &&
                  <span className="help-block text-danger error">
                    {errors.instructions}
                  </span>
                    }
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Update Recipe"
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


EditRecipeForm.defaultProps = {
  editRecipe: {}
};

EditRecipeForm.propTypes = {
  editRecipe: PropTypes.func,
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
  })).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};


const mapStateToProps = state => ({
  recipes: state.userRecipes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editRecipe }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(EditRecipeForm);

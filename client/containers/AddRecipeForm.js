import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { Link } from 'react-router-dom';
import { addRecipe } from '../actions/actions.js';
import { clearError } from '../actions/actions.js';

/**
 * @class AddRecipeForm
 */
class AddRecipeForm extends React.Component {
  constructor(props) {
    super(props);
    this.addRecipe =  this.addRecipe.bind(this);
    this.recipeNum = this.props.recipes.length;
  }

  componentWillMount() {
     this.props.clearError()
  }

  addRecipe(event) {
    event.preventDefault();
    const recipe = {
      title: this.title.value,
      ingredients: this.ingredients.value,
      instructions: this.instructions.value,
      image: 'imageURl'
    }
    this.props.addRecipe(recipe);
  } 

  render() {
    return (
      <div className = "main-userboard-body">
        <div className = "container-fluid">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Add Recipe</li>
          </ol>
        </div>
  
        <div className = "container">
          <div className = "row">
            <div className = "col-sm-12 col-md-8 col-lg-6">
           {this.recipeNum = this.props.recipes.length - this.recipeNum === 1 ? 
            this.props.clearError() && <span></span> : ""} 
              <span>{this.props.message.errors ? this.props.message.errors.response.data.message: ""}</span>
                <form onSubmit = {this.addRecipe}>
                <div className = "form-group">
                  <label htmlFor = "food">Recipe Name</label>
                  <input ref = {(input) => this.title = input} type="text" name="title" 
                  className = "form-control" placeholder="Enter Recipe name" />
                </div>
  
                <div className = "form-group">
                  <input type="file" />
                </div>
  
                  <div className = "form-group">
                  <label htmlFor = "ingredient">Ingredients</label>
                  <input  ref = {(input) => this.ingredients = input}ype="text" name="ingredient" 
                  className = "form-control" placeholder="Enter Ingredients" />
                </div>
  
                <div className = "form-group">
                  <label htmlFor = "instruction">Instructions</label>
                  <textarea ref = {(input) => this.instructions = input} className = "form-control" 
                  placeholder="Enter Instructions" name = "instruction"></textarea>
                </div>
  
                <div className = "form-group">
                  <input type="submit" className = "btn btn-success" value = "Add Recipe" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  
    )
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes,
    message: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({addRecipe, clearError}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipeForm);
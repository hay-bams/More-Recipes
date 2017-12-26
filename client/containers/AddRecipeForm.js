import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @class AddRecipeForm
 */
class AddRecipeForm extends React.Component {
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
                   <form>
                    <div className = "form-group">
                      <label htmlFor = "food">Recipe Name</label>
                      <input type="text" name="food" className = "form-control" placeholder="Enter Recipe name" />
                    </div>
      
                    <div className = "form-group">
                      <input type="file" />
                    </div>
      
                     <div className = "form-group">
                     <label htmlFor = "ingredient">Ingredients</label>
                      <input type="text" name="ingredient" className = "form-control" placeholder="Enter Ingredients" />
                    </div>
      
                    <div className = "form-group">
                     <label htmlFor = "instruction">Instructions</label>
                      <textarea className = "form-control" placeholder="Enter Instructions" name = "instruction"></textarea>
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

export default AddRecipeForm;
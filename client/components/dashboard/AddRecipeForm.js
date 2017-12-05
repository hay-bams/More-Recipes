import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

/**
 * @class AddRecipeForm
 */
class AddRecipeForm extends React.Component {
  renderField(field) {
   return(
    <div className = "form-group has-danger">
        <label htmlFor = "food">{field.label}</label>
        <input 
          type="text"
          {...field.input}
          className = "form-control" placeholder="Enter Recipe name"
        />
        {field.meta.touched ?  field.meta.error : ''}
    </div>
   )
  }

  renderImageField(field) {
    return(
     <div className = "form-group has-danger">
      <input 
        type = "file"
        {...field.input}
      />
      {field.meta.touched ?  field.meta.error : ''}
     </div>
    )
  }

  renderInstructionField(field) {
    return(
      <div className = "form-group has-danger">
        <label htmlFor = "instruction">Instructions</label>
        <textarea {...field.input}  
        className = "form-control" placeholder="Enter Instructions"></textarea>
        {field.meta.touched ?  field.meta.error : ''}
      </div>
    )
  }

  onSubmit(values) {
    console.log(values);
  }


    render() {
       const { handleSubmit } = this.props;
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
                   <form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
                     <Field 
                      name="title"
                      label ="Recipe name"
                      component = {this.renderField}
                     />

                     <Field 
                      name = "image"
                      component = {this.renderImageField}
                     />

                     <Field 
                      name="ingredients"
                      label = "ingredients"
                      component = {this.renderField}
                     />


                     <Field 
                      name = "instruction"
                      label = "Instruction"
                      component = {this.renderInstructionField}
                     />
      
                    <div className = "form-group">
                      <button type="submit" className = "btn btn-success">Add Recipe</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
      
        )
    }
}

const validate = (values) => {
  const errors = {};

  if(!values.title) {
    errors.title = 'Enter title';
  }
  

  // if(!values.image) {
  //   errors.image = 'Upload an image';
  // }

  if(!values.ingredients) {
    errors.ingredients = 'Enter  Ingredients';
  }

  if(!values.instruction) {
    errors.instruction = 'Enter Instructions';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'AddNewRecipe'
})(AddRecipeForm);
import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { addRecipe } from '../actions/actions';
import Authenticate from '../auth/auth';

const dropZoneStyles = {
  border: 'none',
  cursor: 'pointer'
};

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
    this.uploadImageToCloudinary = this.uploadImageToCloudinary.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      errors: {},
      imageURI: null,
      image: null
    };
  }

  /**
   * @param {obj} event
   * @returns {void} onChange
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @param {obj} file
   * @return {void} handleDrop
   */
  handleDrop(file) {
    console.log(file[0]);
    this.setState({ image: file[0] });
  }

  /**
   *
   * @param {obj} event
   * @return {obj} uploadImageToCloudinary
   */
  async uploadImageToCloudinary() {
    this;
    try {
      const imageFile = this.state.image;
      const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dsj9ygnq2/upload';
      const CLOUDINARY_UPLOAD_PRESET = 'xmklgrkm';
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      const response = await axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        data: formData
      });
      return Promise.resolve(response.data.secure_url);
      // return response.data.secure_url;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * @param {obj} event
   * @returns {void} addRecipe
   */
  async addRecipe(event) {
    event.preventDefault();
    AddRecipeForm.clearForm(event);
    const imageURI = await this.uploadImageToCloudinary();
    const recipe = {
      title: this.state.title,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
      image: imageURI
    };

    let errors = Authenticate.validateAddRecipe(recipe);

    if (errors.title !== '' || errors.ingredients !== '' ||
     errors.instructions) {
      return this.setState({ errors });
    }
    this.props.addRecipe(recipe);

    errors = {};
    this.setState({ errors });
  }

  /**
   * @returns {obj} render
   */
  render() {
    let imageSource = null;
    if (this.state.image) {
      imageSource = this.state.image.preview;
    }
    const { errors } = this.state;
    return (
      <div className="main-userboard-body add-recipe-body">
        <div className="container">
          <div className="row">
            <div className="mx-auto col-sm-12 col-md-8 col-lg-8 col-xs mt-5">
              <h2 className="text-center"> Add Recipe</h2>
              <form onSubmit={this.addRecipe}>
                <Dropzone
                  onDrop={this.handleDrop}
                  multiple
                  accept="image/*"
                  style={dropZoneStyles}
                >

                  {this.state.image ?
                    <img className="card-img-top" style={{ height: '450px' }} alt="" src={imageSource} /> :
                    <div className="upload-recipe-img">
                      <div className="row justify-content-center">
                        <div className="col-12">
                          <p className="text-center">
                            <span className="h2"><i className="ion ion-camera" /></span>
                            <br />
                         Click to upload image
                          </p>
                        </div>
                      </div>
                    </div>
                 }
                </Dropzone>
                <div>
                  { errors.image &&
                  <span className="help-block error text-danger">
                    {errors.image}
                  </span>
                    }
                </div>

                <img src={`${this.state.imageURI}`} id="imagePreview" alt="" />
                <div className="form-group">
                  <label htmlFor="food">Recipe Name</label>
                  <input
                    onChange={this.onChange}
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
                  <label htmlFor="ingredient">Ingredients</label>
                  <input
                    onChange={this.onChange}
                    type="text"
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
                    onChange={this.onChange}
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

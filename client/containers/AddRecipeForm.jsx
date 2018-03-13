import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { addRecipe } from '../actions/recipe';
import Authenticate from '../auth/auth';

const dropZoneStyles = {
  border: 'none',
  cursor: 'pointer'
};

/**
 * @class AddRecipeForm
 *
 */
export class AddRecipeForm extends React.Component {
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
      imageURI: null,
      image: null,
      loaded: true,
      uploadError: null,
      ingredientError: '',
      titleError: '',
      instructionError: '',
      addingRecipe: false
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
    this.setState({ image: file[0] });
  }

  /**
   *
   * @param {obj} event
   * @return {obj} uploadImageToCloudinary
   */
  async uploadImageToCloudinary() {
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
    } catch (err) {
      return Promise.reject(err);
    }
  }

  /**
   * @param {obj} event
   * @returns {void} addRecipe
   */
  async addRecipe(event) {
    try {
      event.preventDefault();
      let recipe = {
        title: this.state.title,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
      };

      const errors = Authenticate.validateAddRecipe(recipe);

      if (errors.title !== '' || errors.ingredients !== '' ||
     errors.instructions) {
        return this.setState({
          ingredientError: errors.ingredients,
          titleError: errors.title,
          instructionError: errors.instructions
        });
      }
      this.setState({ loaded: false, addingRecipe: true });
      const imageURI = await this.uploadImageToCloudinary();

      recipe = {
        title: this.state.title,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        image: imageURI
      };

      await this.props.addRecipe(recipe);

      this.props.history.push('/view_recipes');
    } catch (err) {
      if (err.response.data.error.message) {
        this.setState({ loaded: true, uploadError: 'image is required' });
      }
    }
  }

  /**
   * @returns {obj} render
   */
  render() {
    let imageSource = null;
    if (this.state.image) {
      imageSource = this.state.image.preview;
    }
    const { uploadError } = this.state;
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
                  { uploadError &&
                  <span className="help-block error text-danger">
                    {uploadError}
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
                  { this.state.titleError &&
                  <span className="help-block error text-danger">
                    {this.state.titleError}
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
                  { this.state.ingredientError &&
                    <span className="help-block error text-danger">
                      { this.state.ingredientError}
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
                  { this.state.instructionError &&
                  <span className="help-block error text-danger">
                    { this.state.instructionError}
                  </span>
                    }
                </div>
                <Loader
                  loaded={this.state.loaded}
                  lines={13}
                  length={30}
                  width={10}
                  radius={30}
                  corners={1}
                  rotate={0}
                  direction={1}
                  color="#000"
                  speed={2}
                  trail={60}
                  shadow={false}
                  hwaccel={false}
                  className="spinner"
                  zIndex={2e9}
                  top="70%"
                  left="50%"
                  scale={1.00}
                  loadedClassName="loadedContent"
                />

                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-success"
                    disabled={this.state.addingRecipe}
                    value={this.state.addingRecipe ? 'Adding Recipe...' :
                     'Add Recipe'}
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
  addRecipe: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};


const mapStateToProps = state => ({
  recipes: state.recipes,
  loaded: state.loaded
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addRecipe }, dispatch);

const ConnectedAddRecipeForm =
  connect(mapStateToProps, mapDispatchToProps)(AddRecipeForm);

export default ConnectedAddRecipeForm;

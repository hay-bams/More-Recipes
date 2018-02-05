import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { upvoteRecipe } from '../actions/actions';

/**
 *@class ProductDetails
 */
class ProductDetails extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.state = {};
    this.upvote = this.upvote.bind(this);
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
   * @returns {void} componentDidMount
   */
  componentDidMount() {
    this.props.recipes.filter((recipe) => {
      if (recipe.id === parseInt(this.props.match.params.id, 10)) {
        this.setState({ recipe });
      }
    });
  }

  /**
   * @param {obj} event
   * @returns {void} upvote
   */
  upvote(event) {
    event.preventDefault();
    this.props.upvoteRecipe(this.state.recipe.id);
    this.props.recipes.filter((recipe) => {
      if (recipe.id === parseInt(this.props.match.params.id, 10)) {
        this.setState({ recipe });
      }
    });
  }

  /**
   * @returns {obj} render
   */
  render() {
    const { recipe } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="details">{recipe.title}</h2>
          </div>

          <div className="col-sm-6 recipe-img">
            <img className="recipe-details img-fluid" src="images/recipe2.jpg" alt="Details" />
            <a onClick={this.upvote} href="#" className="btn btn-success">
              {recipe.upvotes}
              <i className="fa fa-thumbs-up" aria-hidden="true" />
            </a>
            <a href="#" className="btn btn-info" style={{ marginLeft: `${5}px` }}>
              25
              <i className="fa fa-comment" aria-hidden="true" />
            </a>
            <a href="#" className="btn btn-danger" style={{ marginLeft: `${5}px` }} >
              {recipe.downvotes}
              <i className="fa fa-thumbs-down" aria-hidden="true" />
            </a>
          </div>

          <div className="col-sm-6">
            <h3 className="text-center">Ingredients</h3>
            <p>{recipe.ingredients}</p>
            <h3 className="text-center preparation">Preparations</h3>
            <p>{recipe.instructions}</p>
          </div>
        </div>
      </div>

    );
  }
}

ProductDetails.propTypes = {
  upvoteRecipe: PropTypes.func.isRequired,
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
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ upvoteRecipe }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

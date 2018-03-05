import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';
import { getAllRecipes, searchRecipes } from '../actions/actions';

/**
 * @class RecipeCatalogue
 */
class RecipeCatalogue extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderCatalogue = this.renderCatalogue.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      search: false,
      page: 1,
      loaded: true,
    };
  }
  /**
   * @return {void} componentDidMount
   */
  async componentDidMount() {
    this.setState({ loaded: false });
    await this.props.getAllRecipes(this.state.page);
    this.setState({ loaded: true });
  }

  /**
   * @param {obj} event
   * @returns {void} onSearch
   */
  async onSearch(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value, search: true, loaded: false });
   await this.props.searchRecipes(this.state.page, event.target.value);
   this.setState({ loaded: true });
  }

  /**
   * @param {obj} data
   * @returns {void} handlePageClick
   */
  async handlePageClick(data) {
    const selected = data.selected + 1;
    this.setState({ loaded: false });
    this.setState({ page: selected });
    if (this.state.search) {
    await  this.props.searchRecipes(selected, this.state.recipeSearch);
    } else {
     await this.props.getAllRecipes(selected);
    }
     this.setState({ loaded: true });
  }

  /**
   * @returns {obj} renderCatalogue
   */
  renderCatalogue() {
    const { recipes } = this.props;
    return recipes !== null ?
      recipes.map(recipe => (
        <div
          className="col-12 col-sm-6 col-md-4 col-lg-3 recipes"
          key={recipe.id}
        >
          <div className="card recipe-card" style={{ border: 'none' }}>
            <h4 className="card-header headerColor text-center">{recipe.title}</h4>
            <img
              className="card-img-top img-fluid img-recipe"
              src={recipe.image}
              alt="Card  cap"
              style={{ height: `${200}px` }}
            />
            <div className="card-body">
              <p>{recipe.instructions.slice(1, 60)}</p>
              <span className="card-text">
                <span className="row ml-1">
                  <span className="text-success">
                    <i
                      className="fa fa-thumbs-up col-4"
                      aria-hidden="true"
                    />{recipe.upvotes}
                  </span>
                  <span className="text-info">
                    <i className="fa fa-eye col-4" aria-hidden="true" /> {recipe.views}
                  </span>
                  <span className="text-danger">
                    <i
                      className="fa fa-thumbs-down col-4"
                      aria-hidden="true"
                    />{recipe.downvotes}
                  </span>
                </span>
              </span>
              <Link to={`/details/${recipe.id}`} className="btn btn-outline-info ml-4">view details</Link>
            </div>
          </div>
        </div>
      )) :
      <div className="col-sm-12 text-center">
        <h3 className="mx-auto"> No recipes found</h3>
      </div>;
  }

  /**
   * @returns {obj} render
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h2 className="text-center catalogue">Recipe Catalogues</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <form>
              <div className="form-group">
                <input
                  type="search"
                  className="form-control form-control-lg"
                  placeholder="Search by ingredients or name"
                  name="recipeSearch"
                  onChange={this.onSearch}
                />
                <hr />
              </div>
            </form>
          </div>
          {this.renderCatalogue()}
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

        {this.props.recipes !== null ?
          <div className="row">
            <div className="col-md-8 ml-auto">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel={<a href="">...</a>}
                breakClassName="page-link"
                pageCount={this.props.pages}
                onPageChange={this.handlePageClick}
                containerClassName="pagination pagination-md"
                pageLinkClassName="page-link"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
                disabledClassName="disabled"
                pageClassName="page-item"
                previousClassName="page-item"
                nextClassName="page-item"
                activeClassName="active"
                subContainerClassName="pages pagination"
              />
            </div>
          </div> : ''
       }
      </div>
    );
  }
}

RecipeCatalogue.defaultProps = {
  recipes: {}
};

RecipeCatalogue.propTypes = {
  getAllRecipes: PropTypes.func.isRequired,
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
  })),
  searchRecipes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes.rows,
  pages: state.recipes.pages
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { getAllRecipes, searchRecipes },
  dispatch
);
export default connect(mapStateToProps, mapDispatchToProps)(RecipeCatalogue);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { bindActionCreators } from 'redux';
import Loader from 'react-loader';
import { getAllRecipes, searchRecipes } from '../actions/recipe';
import RecipeCard from '../cards/RecipeCard';

/**
 * @class RecipeCatalogue
 */
export class RecipeCatalogue extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.renderCatalogue = this.renderCatalogue.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      search: false,
      page: 1,
      loaded: true,
      sort: null,
      order: null
    };
  }
  /**
   * @return {void} componentDidMount
   */
  async componentDidMount() {
    this.setState({ loaded: false });
    await this.props
      .getAllRecipes(this.state.sort, this.state.order, this.state.page);
    this.setState({ loaded: true });
  }

  /**
   * @param {obj} event
   * @returns {void} onSearch
   */
  async onSearch(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value, search: true, loaded: false
    });
    await this.props
      .searchRecipes(
        this.state.page,
        event.target.value, this.state.sort, this.state.order
      );
    this.setState({ loaded: true });
  }

  /**
   * @param {obj} event
   * @returns {void} onSelect
   */
  onSelect(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value, loaded: false
    }, async () => {
      if (this.state.search) {
        await this.props.searchRecipes(
          this.state.page,
          this.state.recipeSearch, this.state.sort, this.state.order
        );
      } else {
        await this.props
          .getAllRecipes(this.state.sort, this.state.order, this.state.page);
      }
      this.setState({ loaded: true });
    });
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
      await this.props.searchRecipes(selected,
        this.state.recipeSearch, this.state.sort, this.state.order
      );
    } else {
      await this.props
        .getAllRecipes(this.state.sort, this.state.order, selected);
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
        <RecipeCard {...recipe} key={recipe.id} />
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

                <div className="row">
                  <div className="form-group col-sm-6" onChange={this.onSelect}>
                    <select
                      name="sort"
                      className="form-control" 
                      id="sortButton"
                    >
                      <option value="">Sort By</option>
                      <option value="upvotes" id="upvotes">Upvotes</option>
                      <option value="downvotes" id="downvotes">Downvotes</option>
                    </select>
                  </div>

                  <div className="form-group col-sm-6" onChange={this.onSelect}>
                    <select
                      name="order"
                      className="form-control"
                      id="orderButton"
                    >
                      <option value="">Order By</option>
                      <option value="asc" id="asc">Ascending</option>
                      <option value="desc" id="desc">Descending</option>
                    </select>
                  </div>
                </div>

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

const ConnectedRecipeCatalogue =
  connect(mapStateToProps, mapDispatchToProps)(RecipeCatalogue);

export default ConnectedRecipeCatalogue;


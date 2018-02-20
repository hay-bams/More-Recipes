import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { getRecipeReviews, getUsers } from '../actions/actions';
import recipeImage from '../images/24475008.jpg';


/**
 * @class ProductReviews
 */
class ProductReviews extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.state = {};
    this.userReviews = [];
    this.renderReviews = this.renderReviews.bind(this);
    this.findUser = this.findUser.bind(this);
  }

  /**
  * @returns {void} componentWillMount
  */
  componentWillMount() {
    const recipeId = parseInt(this.props.match.params.id, 10);
    this.props.getRecipeReviews(recipeId);
    this.props.getUsers();
  }

  /**
   * @param {obj} allUsers
   * @param {obj} theReview
   * @returns {void} findUser
   */
  findUser(allUsers, theReview) {
    let firstName;
    const user = allUsers.find(user => theReview.userId === user.id);
    return user ? user.firstName : '';
  }

  /**
   * @returns {void} renderReviews
   */
  renderReviews() {
    const { allUsers } = this.props;
    return this.props.userReviews.map(theReview => (
      <div className="media mt-3" key={theReview.id}>
        <img className="mr-3" src={recipeImage} style={{ width: `${80}px` }} alt="Generic placeholder" />
        <div className="media-body">
          <h5>
            {this.findUser(allUsers, theReview)}
          </h5>
          <p>{theReview.review}</p>
        </div>
      </div>
    ));
  }

  /**
   * @returns {obj} render
   */
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 reviews">
            <h3>Reviews</h3>
            {this.renderReviews()}
          </div>
        </div>
      </div>
    );
  }
}

ProductReviews.propTypes = {
  getUsers: PropTypes.func.isRequired,
  allUsers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.firstName,
    lastName: PropTypes.lastName,
    email: PropTypes.email
  })).isRequired,
  getRecipeReviews: PropTypes.func.isRequired,
  userReviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    recipeId: PropTypes.number,
    review: PropTypes.string,
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
  userReviews: state.reviews,
  allUsers: state.allUsers
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getRecipeReviews, getUsers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);


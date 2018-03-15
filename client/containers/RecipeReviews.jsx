import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Gravatar from 'react-gravatar';
import { getUsers } from '../actions/user';
import { getRecipeReviews } from '../actions/review';

/**
 * @class RecipeReviews
 */
export class RecipeReviews extends React.Component {
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
   * @param {string} filterUser
   * @returns {void} findUser
   */
  findUser(allUsers, theReview, filterUser) {
    let firstName;
    const user = allUsers.find(user => theReview.userId === user.id);
    if (filterUser === 'firstName' && user !== undefined) {
      return user.firstName;
    } else if (filterUser === 'email' && user !== undefined) {
      return user.email;
    }
  }

  /**
   * @returns {void} renderReviews
   */
  renderReviews() {
    const { allUsers } = this.props;

    return this.props.userReviews.map(theReview => (
      <div className="media mt-3" key={theReview.id}>
        <Gravatar
          email={this.findUser(allUsers, theReview, 'email')}
          rating="pg"
          className="CustomAvatar-image"
        />
        <div className="media-body ml-2">
          <h5>
            {this.findUser(allUsers, theReview, 'firstName')}
            <br />
            <small><small>
              {`on 
                 ${new Date(theReview.createdAt).toDateString()}
              `}
            </small>
            </small>
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

RecipeReviews.propTypes = {
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

const ConnectedRecipeReviews =
  connect(mapStateToProps, mapDispatchToProps)(RecipeReviews);

export default ConnectedRecipeReviews;


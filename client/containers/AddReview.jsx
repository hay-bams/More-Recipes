import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Authenticate from '../auth/auth';
import { addReview } from '../actions/actions';

/**
 * @class AddReview
 */
class AddReview extends React.Component {
  /**
   * @param {obj} event
   * @returns {void} clearForm
   */
  static clearForm(event) {
    event.target.review.value = '';
  }

  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.addReview = this.addReview.bind(this);
    this.state = {
      errors: {}
    };
  }
  /**
   * @param {obj} event
   * @returns {void} addReview
   */
  addReview(event) {
    event.preventDefault();
    const userReview = {
      review: event.target.review.value
    };

    const errors = Authenticate.validateReview(userReview);

    if (errors.review !== '') {
      return this.setState({ errors });
    }

    const recipeId = parseInt(this.props.match.params.id, 10);
    this.props.addReview(userReview, recipeId);
    AddReview.clearForm(event);
  }

  /**
   * @returns {void} render
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row review-form">
          <div className="col-lg-6">
            <h4>Add Review</h4>
            <form onSubmit={this.addReview}>
              <div className="form-group">
                <textarea className="form-control" name="review" />
                { errors.review &&
                  <span className="help-block error text-danger">
                    {errors.review}
                  </span>
                    }
              </div>

              <div className="form-group">
                <input type="submit" className="btn btn-success" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddReview.defaultProps = {
  addReview: {},
};

AddReview.propTypes = {
  addReview: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};

const mapStateToProps = state => ({
  UserReviews: state.reviews
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addReview }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);


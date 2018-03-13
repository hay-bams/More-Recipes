import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Authenticate from '../auth/auth';
import { addReview } from '../actions/review';

/**
 * @class AddReview
 */
export class AddReview extends React.Component {
  /**
   * @returns {void} constructor
   */
  constructor() {
    super();
    this.addReview = this.addReview.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.state = {
      review: '',
      reviewError: ''
    };
  }


  /**
  *
  * @param {obj} event
  * @returns {void} onChange
  */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {obj} event
   * @returns {void} clearForm
   */
  clearForm() {
    this.setState({ review: '' });
  }


  /**
   * @param {obj} event
   * @returns {void} addReview
   */
  addReview(event) {
    event.preventDefault();
    const userReview = {
      review: this.state.review
    };

    const errors = Authenticate.validateReview(userReview);

    if (errors.review !== '') {
      return this.setState({ reviewError: errors.review });
    }

    const userData = localStorage.getItem('userData');

    if (userData !== null) {
      const recipeId = parseInt(this.props.match.params.id, 10);
      this.props.addReview(userReview, recipeId);
      this.clearForm();
    } else {
      toastr.warning('you must be signed in');
      this.props.history.push('/signin');
    }
  }

  /**
   * @returns {void} render
   */
  render() {
    return (
      <div className="container">
        <div className="row review-form">
          <div className="col-lg-6">
            <h4>Add Review</h4>
            <form onSubmit={this.addReview}>
              <div className="form-group">
                <textarea
                  onChange={this.onChange}
                  className="form-control"
                  name="review"
                  value={this.state.review}
                />
                { this.state.reviewError &&
                  <span className="help-block error text-danger">
                    {this.state.reviewError}
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
  addReview: () => {},
};

AddReview.propTypes = {
  addReview: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.funct
  }).isRequired
};

const mapStateToProps = state => ({
  UserReviews: state.reviews
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addReview }, dispatch);

const ConnectedAddReview =
  connect(mapStateToProps, mapDispatchToProps)(AddReview);

export default ConnectedAddReview;


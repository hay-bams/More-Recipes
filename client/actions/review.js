import axios from 'axios';
import CONSTANT from '../constant';

export const addReview = async (userReview, recipeId) => {
  try {
    const userData = JSON.parse(localStorage.userData);
    const userToken = userData.token;

    const response = await axios({
      method: 'post',
      url: `api/v1/recipes/${recipeId}/reviews`,
      data: userReview,
      headers: { token: userToken }
    });
    toastr.success(response.data.message);
    return {
      type: CONSTANT.ADD_REVIEW,
      payload: response.data
    };
  } catch ({ response }) {
    if (response.data.error !== undefined &&
      response.data.error.name === 'TokenExpiredError') {
      localStorage.removeItem('userData');
      toastr.warning('session has expired, please signin'); 
      return {
        type: CONSTANT.SIGN_OUT,
        payload: null
      };
    }
    return {
      type: CONSTANT.ADD_REVIEW_ERRORS,
      payload: response,
      name: 'addReviewError'
    };
  }
};

export const getRecipeReviews = async (recipeId) => {
  try {
    let payloadData;

    const recipeReviews = await axios({
      method: 'get',
      url: `api/v1/reviews/${recipeId}`,
    });

    if (recipeReviews.data.data !== undefined) {
      payloadData = recipeReviews.data.data;
    } else {
      payloadData = [];
    }

    return {
      type: CONSTANT.GET_RECIPES_REVIEWS,
      payload: payloadData
    };
  } catch ({ response }) {
    if (response.data.error !== undefined &&
      response.data.error.name === 'TokenExpiredError') {
      localStorage.removeItem('userData');
      toastr.warning('session has expired, please signin');
      return {
        type: CONSTANT.SIGN_OUT,
        payload: null
      };
    }
    return {
      type: CONSTANT.GET_REVIEW_ERRORS,
      payload: response,
      name: 'getReviewError'
    };
  }
};

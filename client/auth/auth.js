import isEmail from 'validator/lib/isEmail';

/**
 * @class Authenticate
 */
class Authenticate {
  /**
   * @returns {void} constructor
   */
  constructor() {
    this.errors = {};
  }

  /**
   *@returns {obj} validateUserSignup
   * @param {obj} user
   */
  validateUserSignup(user) {
    this.errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!user.firstName) {
      this.errors.firstName = 'please enter your first name';
    }

    if (!user.lastName) {
      this.errors.lastName = 'please enter your last name';
    }

    if (!isEmail(user.email)) {
      this.errors.email = 'please enter a valid email';
    }

    if (!user.password) {
      this.errors.password = 'please enter your password';
    }

    if (user.password !== user.confirmPassword) {
      this.errors.confirmPassword = 'password should match';
    }
    return this.errors;
  }

  /**
   *@returns {obj} validateUserSignin
   * @param {obj} user
   */
  validateUserSignin(user) {
    this.errors = {
      email: '',
      password: ''
    };
    if (!isEmail(user.email)) {
      this.errors.email = 'please enter a valid email';
    }

    if (!user.password) {
      this.errors.password = 'please enter your password';
    }

    if (!user.email) {
      this.errors.email = 'please enter your email';
    }
    return this.errors;
  }

  /**
   *@returns {obj} validateAddRecipe
   * @param {obj} recipe
   */
  validateAddRecipe(recipe) {
    this.errors = {
      title: '',
      ingredients: '',
      instructions: ''
    };
    if (!recipe.title) {
      this.errors.title = 'please enter a recipe title';
    }

    if (!recipe.ingredients) {
      this.errors.ingredients = 'please enter recipe ingredients';
    }

    if (!recipe.instructions) {
      this.errors.instructions = 'please enter recipe instructions';
    }
    
    return this.errors;
  }

  /**
   * @param {obj} userReview
   * @returns {void} validateReview
   */
  validateReview(userReview) {
    this.errors = {
      review: ''
    };

    if (!userReview.review) {
      this.errors.review = 'please enter review';
    }

    return this.errors;
  }
}

const authenticate = new Authenticate();

export default authenticate;


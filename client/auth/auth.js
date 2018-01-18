import isEmail from 'validator/lib/isEmail';

/**
 * @class Authenticate
 */
class Authenticate {
  constructor() {
    this.errors = {}
  }

  /**
   *@returns {obj} validateUserSignup
   * @param {obj} user
   */
  static validateUserSignup(user) {
    if (!user.firstName) {
      return 'please enter your first name'; 
    } else if (!user.lastName) {
      return 'please enter your last name';
    } else if (!isEmail(user.email)) {
      return 'please enter a valid email';
    } else if (!user.password) {
      return 'please enter your password';
    } else if (user.password !== user.confirmPassword) {
      return 'password should match';
    }
  }

  /**
   *@returns {obj} validateUserSignin
   * @param {obj} user
   */
   validateUserSignin(user) {
     this.errors = {
       email: '',
       password: ''
     }
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
}

Authenticate = new Authenticate();

export default Authenticate;


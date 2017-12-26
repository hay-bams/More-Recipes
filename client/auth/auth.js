import isEmail from 'validator/lib/isEmail';

/**
 * @class Authenticate
 */
class Authenticate {
  /**
   *@returns {obj} validateUser
   * @param {obj} user
   */
  static validateUser(user) {
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
}

export default Authenticate;


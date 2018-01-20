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


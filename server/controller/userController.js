import models from '../models';

/**
 * @class controller
 */
class Controller {
  /**
   * @returns {obj} constructor
   * @param {obj} models
   */
  constructor() {
    this.models = models;
  }
  /**
   * @return {obj}singup
   * @param {*} req
   * @param {*} res
   */
  signup(req, res) {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    this.models.User.create(user)
      .then(newUser => res.status(201).send(newUser))
      .catch(error => res.status(400).send(error));
  }
}

const UserController = new Controller();
export default UserController;

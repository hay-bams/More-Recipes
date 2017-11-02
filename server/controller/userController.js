import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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
    this.secret = 'This is your guy';
  }
  /**
   * @return {obj}singup
   * @param {*} req
   * @param {*} res
   */
  signup(req, res) {
    if (!req.body.firstName) {
      return res.status(401).send('Please enter your first name');
    } else if (!req.body.lastName) {
      return res.status(401).send('Please enter your last name');
    } else if (!req.body.email) {
      return res.status(401).send('Please enter your email');
    } else if (!req.body.password) {
      return res.status(401).send('Please enter your password');
    } else if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).send('Password should match');
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    };
    this.models.User.create(user)
      .then(newUser => res.status(201).send(newUser))
      .catch(error => res.status(400).send(error));
  }

  /**
   * @return {obj} signin
   * @param {*} req
   * @param {*} res
   */
  signin(req, res) {

    this.models.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).send('User not found');
        }
        const validPassword = bcrypt.compareSync(req.body.password, userFound.password);
        if (!validPassword) {
          return res.status(401).send('Wrong password');
        }
        const token = jwt.sign({ id: userFound.id }, this.secret, { expiresIn: 87640 });
        res.send(token);
      });
  }
}


const UserController = new Controller();
export default UserController;

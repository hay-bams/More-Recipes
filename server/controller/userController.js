import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import models from '../models';

const secret = 'This is your guy';

/**
 * @class controller
 */
class UserController {
  /**
   * @return {obj}singup
   * @param {*} req
   * @param {*} res
   */
  static signup(req, res) {
    if (!req.body.firstName) {
      return res.status(401).send({ success: 'false', message: 'please enter your first name' });
    } else if (!req.body.lastName) {
      return res.status(401).send({ success: 'false', message: 'please enter your last name' });
    } else if (!req.body.email) {
      return res.status(401).send({ success: 'false', message: 'please enter your email' });
    } else if (!req.body.password) {
      return res.status(401).send({ success: 'false', message: 'please enter your password' });
    } else if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).send({ success: 'false', message: 'passowrd should match' });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    };
    models.User.create(user)
      .then(newUser => res.status(201).send({ success: 'true', message: 'User created', data: newUser }))
      .catch(err => res.status(500).send({ success: 'false', message: 'internal server error', error: err }));
  }

  /**
   * @return {obj} signin
   * @param {*} req
   * @param {*} res
   */
  static signin(req, res) {
    // validate that email and passwords are set
    if (!req.body.email) {
      return res.status(404).send({ success: 'false', message: 'please enter your email' });
    } else if (!req.body.password) {
      return res.status(404).send({ success: 'false', message: 'please enter your password' });
    }
    // find user with their emails
    models.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).send({ success: 'false', message: 'User not found' });
        }
        const validPassword = bcrypt.compareSync(req.body.password, userFound.password);
        if (!validPassword) {
          return res.status(401).send({ success: 'false', message: 'wrong password' });
        } 
        const token = jwt.sign({ id: userFound.id }, secret, { expiresIn: 87640 });
        res.send({ success: 'true', message: 'successfully signed in', token: token });
      });
  }
}

export default UserController;

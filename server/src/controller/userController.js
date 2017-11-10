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
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    };
    models.User.create(user)
      .then(newUser => res.status(201).send({ success: 'true', message: 'User created', data: newUser }))
      .catch(err => res.status(400).send({ success: 'false', message: 'user already exist', error: err }));
  }

  /**
   * @return {obj} signin
   * @param {*} req
   * @param {*} res
   */
  static signin(req, res) {
    models.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).send({ success: 'false', message: 'Incorrect email, user not found' });
        }
        const validPassword = bcrypt.compareSync(req.body.password, userFound.password);
        if (!validPassword) {
          return res.status(403).send({ success: 'false', message: 'wrong password' });
        } 
        const token = jwt.sign({ id: userFound.id }, secret, { expiresIn: 87640 });
        res.status(201).send({ success: 'true', message: 'successfully signed in', token });
      });
  }
}

export default UserController;

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';
import models from '../models';

const secret = process.env.SECRET;

/**
 * @class controller
 */
class UserController {
  /**
   * @return {obj}singup
   * @param {*} req
   * @param {*} res
   */
  static async signup(req, res) {
    try {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
      };

      const userFound = await models.User.findOne({
        where: { email: user.email }
      });
      if (userFound) {
        return res.status(403).send({
          success: 'false',
          message: 'Email already registered'
        });
      }

      if (!isEmail(req.body.email)) {
        return res.status(400).send({
          sucess: 'false',
          message: 'invalid email address'
        });
      }

      const newUser = await models.User.create(user);
      const publicUserData = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      };
      const token = jwt.sign(publicUserData, secret, { expiresIn: 87640 });
      return res.status(201).send({
        success: 'true',
        message: 'User created successfully',
        token,
        user: publicUserData
      });
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'Internal server error',
        error: err
      });
    }
  }

  /**
   * @return {obj} signin
   * @param {*} req
   * @param {*} res
   */
  static async signin(req, res) {
    try {
      if (!isEmail(req.body.email)) {
        return res.status(400).send({
          sucess: 'false',
          message: 'invalid email address'
        });
      }

      const userFound = await models.User.findOne({
        where: { email: req.body.email }
      });
      if (!userFound) {
        return res.status(403).send({
          success: 'false',
          message: 'Incorrect email or password, user not found'
        });
      }
      const validPassword = bcrypt.compareSync(req.body.password, userFound.password);
      if (!validPassword) {
        return res.status(403).send({
          success: 'false',
          message: 'wrong password'
        });
      }

      const publicUserData = {
        id: userFound.id,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        email: userFound.email,
        password: req.body.password
      };

      const token = jwt.sign(publicUserData, secret, { expiresIn: 87640 });
      res.status(201).send({
        success: 'true',
        message: 'successfully signed in',
        token,
        user: publicUserData
      });
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'Internal server error',
        error: err
      });
    }
  }

  /**
   * @return {obj} updateProfile
   * @param {obj} req
   * @param {obj} res
   */
  static async updateProfile(req, res) {
    try {
      const id = parseInt(req.params.userId, 10);
      const userFound = await models.User.findById(id);

      if (!userFound) {
        return res.status(404).send({
          success: 'false',
          message: 'user does not exist'
        });
      }

      const user = {
        firstName: req.body.firstName || userFound.firstName,
        lastName: req.body.lastName || userFound.lastName,
        email: req.body.email || userFound.email
      };
    
      const updatedProfile = await userFound.update(user);

      res.status(201).send({
        success: 'true',
        message: 'User updated successfully',
        data: updatedProfile
      });
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error',
        error: err
      });
    }
  }


  /**
   * @return {obj} updatePassword
   * @param {obj} req
   * @param {obj} res
   */
  static async updatePassword(req, res) {
    try {
      const id = parseInt(req.params.userId, 10);
      const userFound = await models.User.findById(id);

      if (!userFound) {
        return res.status(404).send({
          success: 'false',
          message: 'user does not exist'
        });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      const userPassword = {
        password: hashedPassword || userFound.password
      };
    
      await userFound.update(userPassword);

      res.status(201).send({
        success: 'true',
        message: 'Password updated successfully',
        data: userPassword
      });
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error',
        error: err
      });
    }
  }

  /**
   * @return {obj} findAllUsers
   * @param {obj} req
   * @param {obj} res
   */
  static async findAllUsers(req, res) {
    const userFound = await models.User.findAll();
    if (!userFound) {
      return res.status(404).send({
        success: 'false',
        message: 'No user exist in the database'
      });
    }

    const publicUserData = [];

    userFound.map((user) => {
      const userData = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      publicUserData.push(userData);
    });

    res.status(200).send({
      success: 'true',
      message: 'All Users',
      data: publicUserData
    });
  }
}

export default UserController;

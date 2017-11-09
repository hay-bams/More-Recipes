'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var secret = 'This is your guy';

/**
 * @class controller
 */

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: 'signup',

    /**
     * @return {obj}singup
     * @param {*} req
     * @param {*} res
     */
    value: function signup(req, res) {
      var hashedPassword = _bcryptjs2.default.hashSync(req.body.password, 8);
      var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
      };
      _models2.default.User.create(user).then(function (newUser) {
        return res.status(201).send({ success: 'true', message: 'User created', data: newUser });
      }).catch(function (err) {
        return res.status(400).send({ success: 'false', message: 'user already exist', error: err });
      });
    }

    /**
     * @return {obj} signin
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      _models2.default.User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function (userFound) {
        if (!userFound) {
          return res.status(404).send({ success: 'false', message: 'Incorrect email, user not found' });
        }
        var validPassword = _bcryptjs2.default.compareSync(req.body.password, userFound.password);
        if (!validPassword) {
          return res.status(403).send({ success: 'false', message: 'wrong password' });
        }
        var token = _jsonwebtoken2.default.sign({ id: userFound.id }, secret, { expiresIn: 87640 });
        res.status(201).send({ success: 'true', message: 'successfully signed in', token: token });
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;
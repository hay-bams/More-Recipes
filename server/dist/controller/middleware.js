'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var secret = 'This is your guy';

/**
 * @class Middleware
 */

var Middleware = function () {
  function Middleware() {
    _classCallCheck(this, Middleware);
  }

  _createClass(Middleware, null, [{
    key: 'validateAddRecipe',

    /**
     *@returns {obj} validateSignUpForm
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     */
    value: function validateAddRecipe(req, res, next) {
      if (!req.body.title) {
        return res.status(400).send({ success: 'false', message: ' title is required' });
      } else if (!req.body.instructions) {
        return res.status(400).send({ success: 'false', message: 'instruction is required' });
      } else if (!req.body.ingredients) {
        return res.status(400).send({ success: 'false', message: 'ingredients are required' });
      } else if (!req.body.image) {
        return res.status(400).send({ success: 'false', message: 'image is required' });
      }
      next();
    }

    /**
     * @returns {obj} verifyToken
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */

  }, {
    key: 'verifyToken',
    value: function verifyToken(req, res, next) {
      var token = req.headers.token;

      if (!token) return res.status(401).send({ success: 'false', message: 'user not signed in' });

      _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
        if (err) return res.status(401).send({ success: 'false', message: 'Invalid username or password.', error: err });

        req.decoded = decoded;
        next();
      });
    }

    /**
     * @returns {*} validateUserSignup
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */

  }, {
    key: 'validateUserSignup',
    value: function validateUserSignup(req, res, next) {
      if (!req.body.firstName) {
        return res.status(400).send({ success: 'false', message: 'please enter your first name' });
      } else if (!req.body.lastName) {
        return res.status(400).send({ success: 'false', message: 'please enter your last name' });
      } else if (!req.body.email) {
        return res.status(400).send({ success: 'false', message: 'please enter your email' });
      } else if (!req.body.password) {
        return res.status(400).send({ success: 'false', message: 'please enter your password' });
      } else if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).send({ success: 'false', message: 'passowrd should match' });
      }
      next();
    }

    /**
     * @returns {*} validateUserSignin
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */

  }, {
    key: 'validateUserSignin',
    value: function validateUserSignin(req, res, next) {
      if (!req.body.email) {
        return res.status(400).send({ success: 'false', message: 'please enter your email' });
      } else if (!req.body.password) {
        return res.status(400).send({ success: 'false', message: 'please enter your password' });
      }
      next();
    }
  }]);

  return Middleware;
}();

exports.default = Middleware;
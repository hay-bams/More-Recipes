'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _isEmail = require('validator/lib/isEmail');

var _isEmail2 = _interopRequireDefault(_isEmail);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var hashedPassword, user, userFound, newUser, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                hashedPassword = _bcryptjs2.default.hashSync(req.body.password, 8);
                user = {
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  password: hashedPassword
                };
                _context.next = 5;
                return _models2.default.User.findOne({ where: { email: user.email } });

              case 5:
                userFound = _context.sent;

                if (!userFound) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', res.status(403).send({ success: 'false', message: 'Email already registered' }));

              case 8:
                if ((0, _isEmail2.default)(req.body.email)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({ sucess: 'false', message: 'invalid email address' }));

              case 10:
                _context.next = 12;
                return _models2.default.User.create(user);

              case 12:
                newUser = _context.sent;
                token = _jsonwebtoken2.default.sign({
                  id: newUser.id,
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  email: newUser.email
                }, secret, { expiresIn: 87640 });
                return _context.abrupt('return', res.status(201).send({
                  success: 'true', message: 'User created', token: token
                }));

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](0);

                res.status(500).send({ success: 'false', message: 'Internal server error', error: _context.t0 });

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 17]]);
      }));

      function signup(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return signup;
    }()

    /**
     * @return {obj} signin
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'signin',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var userFound, validPassword, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models2.default.User.findOne({ where: { email: req.body.email } });

              case 3:
                userFound = _context2.sent;

                if (userFound) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt('return', res.status(403).send({ success: 'false', message: 'Incorrect email or password, user not found' }));

              case 6:
                validPassword = _bcryptjs2.default.compareSync(req.body.password, userFound.password);

                if (validPassword) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', res.status(403).send({ success: 'false', message: 'wrong password' }));

              case 9:
                if ((0, _isEmail2.default)(req.body.email)) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt('return', res.status(400).send({ sucess: 'false', message: 'invalid email address' }));

              case 11:
                token = _jsonwebtoken2.default.sign({
                  id: userFound.id,
                  firstName: userFound.firstName,
                  lastName: userFound.lastName,
                  email: userFound.email
                }, secret, { expiresIn: 87640 });

                res.status(201).send({ success: 'true', message: 'successfully signed in', token: token });
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2['catch'](0);

                res.status(500).send({ success: 'false', message: 'Internal server error', error: _context2.t0 });

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 15]]);
      }));

      function signin(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return signin;
    }()
  }]);

  return UserController;
}();

exports.default = UserController;
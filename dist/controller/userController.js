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
        var hashedPassword, user, userFound, newUser, publicUserData, token;
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
                return _models2.default.User.findOne({
                  where: { email: user.email }
                });

              case 5:
                userFound = _context.sent;

                if (!userFound) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('return', res.status(403).send({
                  success: 'false',
                  message: 'Email already registered'
                }));

              case 8:
                if ((0, _isEmail2.default)(req.body.email)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({
                  sucess: 'false',
                  message: 'invalid email address'
                }));

              case 10:
                _context.next = 12;
                return _models2.default.User.create(user);

              case 12:
                newUser = _context.sent;
                publicUserData = {
                  id: newUser.id,
                  firstName: newUser.firstName,
                  lastName: newUser.lastName,
                  email: newUser.email
                };
                token = _jsonwebtoken2.default.sign(publicUserData, secret, { expiresIn: 87640 });
                return _context.abrupt('return', res.status(201).send({
                  success: 'true',
                  message: 'User created successfully',
                  token: token,
                  user: publicUserData
                }));

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'Internal server error',
                  error: _context.t0
                });

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
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
        var userFound, validPassword, publicUserData, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if ((0, _isEmail2.default)(req.body.email)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt('return', res.status(400).send({
                  sucess: 'false',
                  message: 'invalid email address'
                }));

              case 3:
                _context2.next = 5;
                return _models2.default.User.findOne({
                  where: { email: req.body.email }
                });

              case 5:
                userFound = _context2.sent;

                if (userFound) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', res.status(403).send({
                  success: 'false',
                  message: 'Incorrect email or password, user not found'
                }));

              case 8:
                validPassword = _bcryptjs2.default.compareSync(req.body.password, userFound.password);

                if (validPassword) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt('return', res.status(403).send({
                  success: 'false',
                  message: 'wrong password'
                }));

              case 11:
                publicUserData = {
                  id: userFound.id,
                  firstName: userFound.firstName,
                  lastName: userFound.lastName,
                  email: userFound.email,
                  password: req.body.password
                };
                token = _jsonwebtoken2.default.sign(publicUserData, secret, { expiresIn: 87640 });

                res.status(201).send({
                  success: 'true',
                  message: 'successfully signed in',
                  token: token,
                  user: publicUserData
                });
                _context2.next = 19;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'Internal server error',
                  error: _context2.t0
                });

              case 19:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 16]]);
      }));

      function signin(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return signin;
    }()

    /**
     * @return {obj} updateRecipe
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'updateProfile',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, userFound, hashedPassword, user, updatedProfile;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = parseInt(req.params.userId, 10);
                _context3.next = 4;
                return _models2.default.User.findById(id);

              case 4:
                userFound = _context3.sent;

                if (userFound) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', res.status(404).send({
                  success: 'false',
                  message: 'user does not exist'
                }));

              case 7:
                if ((0, _isEmail2.default)(req.body.email)) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt('return', res.status(400).send({
                  sucess: 'false',
                  message: 'invalid email address'
                }));

              case 9:
                hashedPassword = _bcryptjs2.default.hashSync(req.body.password, 8);
                user = {
                  firstName: req.body.firstName || userFound.firstName,
                  lastName: req.body.lastName || userFound.lastName,
                  email: req.body.email || userFound.email,
                  password: hashedPassword || userFound.password
                };
                _context3.next = 13;
                return userFound.update(user);

              case 13:
                updatedProfile = _context3.sent;


                res.status(201).send({
                  success: 'true',
                  message: 'User updated successfully',
                  data: updatedProfile
                });
                _context3.next = 20;
                break;

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'internal server error',
                  error: _context3.t0
                });

              case 20:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 17]]);
      }));

      function updateProfile(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return updateProfile;
    }()

    /**
     * @return {obj} findAllUsers
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'findAllUsers',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var userFound, publicUserData;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _models2.default.User.findAll();

              case 2:
                userFound = _context4.sent;

                if (userFound) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt('return', res.status(404).send({
                  success: 'false',
                  message: 'No user exist in the database'
                }));

              case 5:
                publicUserData = [];


                userFound.map(function (user) {
                  var userData = {
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

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findAllUsers(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return findAllUsers;
    }()
  }]);

  return UserController;
}();

exports.default = UserController;
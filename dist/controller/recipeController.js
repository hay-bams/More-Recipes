'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class RecipeController
 */
var RecipeController = function () {
  function RecipeController() {
    _classCallCheck(this, RecipeController);
  }

  _createClass(RecipeController, null, [{
    key: 'addRecipe',

    /**
     *@returns {obj} addRecipe
     * @param {obj} req
     * @param {obj} res
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var recipe, newRecipe;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                recipe = {
                  title: req.body.title,
                  image: req.body.image,
                  instructions: req.body.instructions,
                  ingredients: req.body.ingredients,
                  userId: req.decoded.id
                };
                _context.next = 4;
                return _models2.default.Recipe.create(recipe);

              case 4:
                newRecipe = _context.sent;

                res.status(201).send({ success: 'true', message: 'Recipe Created', data: newRecipe });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                res.status(500).send({ success: 'false', message: 'Internal server error', error: _context.t0 });

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function addRecipe(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addRecipe;
    }()

    /**
     * @returns {obj} getAllRecipe
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'getAllRecipe',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var allRecipes, _allRecipes;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                console.log(req.query);

                if (!(Object.keys(req.query).length > 0)) {
                  _context2.next = 14;
                  break;
                }

                console.log(req.query);

                if (!(req.query.sort === 'upvotes' && req.query.order === 'desc')) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 7;
                return _models2.default.Recipe.findAll();

              case 7:
                allRecipes = _context2.sent;

                if (!(allRecipes.length === 0)) {
                  _context2.next = 10;
                  break;
                }

                return _context2.abrupt('return', res.status(200).send({ success: 'false', message: 'No recipes at the moment' }));

              case 10:
                allRecipes.sort(function (a, b) {
                  return b.upvotes - a.upvotes;
                });
                return _context2.abrupt('return', res.status(200).send({ success: 'true', message: 'Recipes found', data: allRecipes }));

              case 12:
                _context2.next = 18;
                break;

              case 14:
                _context2.next = 16;
                return _models2.default.Recipe.findAll();

              case 16:
                _allRecipes = _context2.sent;

                if (_allRecipes.length === 0) {
                  res.status(200).send({ success: 'false', message: 'No recipes at the moment' });
                } else {
                  res.status(200).send({ success: 'true', message: 'Recipes found', data: _allRecipes });
                }

              case 18:
                _context2.next = 23;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2['catch'](0);

                res.status(500).send({ success: 'false', message: 'internal server error', error: _context2.t0 });

              case 23:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 20]]);
      }));

      function getAllRecipe(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getAllRecipe;
    }()

    /**
     * @return {obj} getUserRecipes
     * @param {obj} req 
     * @param {obj} res 
     */

  }, {
    key: 'getUserRecipes',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var userRecipes;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models2.default.Recipe.findAll({
                  where: { userId: req.decoded.id }
                });

              case 3:
                userRecipes = _context3.sent;

                if (userRecipes.length === 0) {
                  res.status(200).send({ success: 'false', message: 'You have no recipes at the moment' });
                } else {
                  res.status(200).send({ success: 'true', message: 'Recipes found', data: userRecipes });
                }
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);

                res.status(500).send({ success: 'false', message: 'internal server error' });

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function getUserRecipes(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getUserRecipes;
    }()

    /**
     * @return {obj} updateRecipe
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'updateRecipe',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, recipeFound, recipe, updatedRecipe;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = parseInt(req.params.recipeId, 10);
                _context4.next = 4;
                return _models2.default.Recipe.findById(id);

              case 4:
                recipeFound = _context4.sent;

                if (recipeFound) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt('return', res.status(404).send({ success: 'false', message: 'Recipe does not exist' }));

              case 7:
                recipe = {
                  title: req.body.title || recipeFound.title,
                  image: req.body.image || recipeFound.image,
                  instructions: req.body.instructions || recipeFound.instructions,
                  ingredients: req.body.ingredients || recipeFound.ingredients,
                  userId: req.decoded.id
                };

                if (!(recipeFound.userId === req.decoded.id)) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 11;
                return recipeFound.update(recipe);

              case 11:
                updatedRecipe = _context4.sent;

                res.status(201).send({ success: 'true', message: 'Recipe updated successfully', data: updatedRecipe });
                _context4.next = 16;
                break;

              case 15:
                res.status(401).send({ success: 'false', message: 'you are not authorized to update this recipe' });

              case 16:
                _context4.next = 21;
                break;

              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4['catch'](0);

                res.status(500).send({ success: 'false', message: 'internal server error', error: _context4.t0 });

              case 21:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 18]]);
      }));

      function updateRecipe(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return updateRecipe;
    }()

    /**
     * @return {obj} deleteRecipe
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'deleteRecipe',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var id, recipeFound;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = parseInt(req.params.recipeId, 10);
                _context5.next = 4;
                return _models2.default.Recipe.findById(id);

              case 4:
                recipeFound = _context5.sent;

                if (recipeFound) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt('return', res.status(404).send({ success: 'false', message: 'Recipe does not exist' }));

              case 7:

                if (recipeFound.userId === req.decoded.id) {
                  recipeFound.destroy();
                  res.status(200).send({ success: 'true', message: 'Recipe deleted' });
                } else {
                  res.status(401).send({ success: 'false', message: 'You are not authorized to delete this recipe' });
                }
                _context5.next = 13;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5['catch'](0);

                res.status(500).send({ sucess: 'false', message: 'Internal server error', error: _context5.t0 });

              case 13:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 10]]);
      }));

      function deleteRecipe(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return deleteRecipe;
    }()

    /**
     * @returns {obj} addReview
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'addReview',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var id, recipeFound, review, newReview;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;

                if (req.body.review) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt('return', res.status(400).send({ success: 'false', message: 'The review field is required' }));

              case 3:
                id = parseInt(req.params.recipeId, 10);
                _context6.next = 6;
                return _models2.default.Recipe.findById(id);

              case 6:
                recipeFound = _context6.sent;

                if (recipeFound) {
                  _context6.next = 9;
                  break;
                }

                return _context6.abrupt('return', res.status(404).send({ success: 'true', message: 'Can\'t add review for a recipe that does not exist' }));

              case 9:
                review = {
                  review: req.body.review,
                  userId: req.decoded.id,
                  recipeId: id
                };
                _context6.next = 12;
                return _models2.default.Review.create(review);

              case 12:
                newReview = _context6.sent;

                res.status(201).send({ success: 'true', message: 'New review added', data: newReview });
                _context6.next = 19;
                break;

              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6['catch'](0);

                res.status(500).send({ success: 'false', message: 'internal server error', error: _context6.t0 });

              case 19:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 16]]);
      }));

      function addReview(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return addReview;
    }()

    /**
     * @returns {obj} getUserFavourites
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'getUserFavourites',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var userId, favourite;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                userId = parseInt(req.params.userId, 10);

                if (!(userId === req.decoded.id)) {
                  _context7.next = 11;
                  break;
                }

                _context7.next = 5;
                return _models2.default.Favourite.findAll({
                  where: { userId: req.decoded.id }
                });

              case 5:
                favourite = _context7.sent;

                if (!(favourite.length === 0)) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt('return', res.status(200).send({ success: 'true', message: 'No favourite recipes' }));

              case 8:

                res.status(200).send({ success: 'true', message: 'Successfully retrieved favourites', data: favourite });
                _context7.next = 12;
                break;

              case 11:
                return _context7.abrupt('return', res.status(400).send({ success: 'false', message: 'Please sign in' }));

              case 12:
                _context7.next = 17;
                break;

              case 14:
                _context7.prev = 14;
                _context7.t0 = _context7['catch'](0);
                return _context7.abrupt('return', res.status(500).send({ success: 'false', message: 'internal server error' }));

              case 17:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 14]]);
      }));

      function getUserFavourites(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return getUserFavourites;
    }()

    /**
     * @return {obj} addUserFavourites
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'addUserFavourite',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var recipeId, favourite, fav, newFav;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                recipeId = parseInt(req.params.recipeId, 10);
                favourite = {
                  recipeId: recipeId,
                  userId: req.decoded.id
                };
                _context8.next = 5;
                return _models2.default.Favourite.findOne({
                  where: { recipeId: recipeId, userId: req.decoded.id }
                });

              case 5:
                fav = _context8.sent;

                if (!fav) {
                  _context8.next = 8;
                  break;
                }

                return _context8.abrupt('return', res.status(400).send({ success: 'true', message: 'Recipe already added as favourite' }));

              case 8:
                _context8.next = 10;
                return _models2.default.Favourite.create(favourite);

              case 10:
                newFav = _context8.sent;

                res.status(200).send({ success: 'true', message: 'Recipe added to favourites', data: newFav });
                _context8.next = 17;
                break;

              case 14:
                _context8.prev = 14;
                _context8.t0 = _context8['catch'](0);

                res.status(500).send({ success: 'false', message: 'internal server error', error: _context8.t0 });

              case 17:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 14]]);
      }));

      function addUserFavourite(_x15, _x16) {
        return _ref8.apply(this, arguments);
      }

      return addUserFavourite;
    }()

    /**
     * @return {obj} upvote
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'upvote',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var recipeId, recipeFound, userUpvote, upvoteFound, newUpvote, downvoteFound;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                recipeId = parseInt(req.params.recipeId, 10);
                _context9.next = 4;
                return _models2.default.Recipe.findById(recipeId);

              case 4:
                recipeFound = _context9.sent;

                if (recipeFound) {
                  _context9.next = 7;
                  break;
                }

                return _context9.abrupt('return', res.status(404).send({ success: false, message: 'recipe does not exist' }));

              case 7:
                userUpvote = {
                  recipeId: recipeId,
                  userId: req.decoded.id
                };
                _context9.next = 10;
                return _models2.default.Upvote.findAll({
                  where: { userId: req.decoded.id, recipeId: recipeId }
                });

              case 10:
                upvoteFound = _context9.sent;

                if (!(upvoteFound.length > 0)) {
                  _context9.next = 13;
                  break;
                }

                return _context9.abrupt('return', res.status(400).send({ success: 'false', message: 'can\'t upvote more than once' }));

              case 13:
                _context9.next = 15;
                return _models2.default.Upvote.create(userUpvote);

              case 15:
                newUpvote = _context9.sent;

                res.status(201).send({ success: 'true', message: 'Recipe upvoted', data: newUpvote });

                if (recipeFound) {
                  recipeFound.increment('upvotes', { where: { id: recipeId } });
                } else {
                  res.status(500).send({ success: 'false', message: 'Can\'t find recipe' });
                }

                _context9.next = 20;
                return _models2.default.Downvote.findAll({
                  where: { userId: req.decoded.id, recipeId: recipeId }
                });

              case 20:
                downvoteFound = _context9.sent;


                if (downvoteFound.length > 0) {
                  _models2.default.Downvote.destroy({
                    where: { userId: req.decoded.id, recipeId: recipeId }
                  });
                  recipeFound.decrement('downvotes', { where: { id: recipeId } });
                }
                _context9.next = 27;
                break;

              case 24:
                _context9.prev = 24;
                _context9.t0 = _context9['catch'](0);

                res.status(500).send({ success: 'false', message: 'Internal server error', error: _context9.t0 });

              case 27:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 24]]);
      }));

      function upvote(_x17, _x18) {
        return _ref9.apply(this, arguments);
      }

      return upvote;
    }()

    /**
     * @return {obj} downvote
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'downvote',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
        var recipeId, recipeFound, userDownvote, downvoteFound, newDownvote, UpvoteFound;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                recipeId = parseInt(req.params.recipeId, 10);
                _context10.next = 4;
                return _models2.default.Recipe.findById(recipeId);

              case 4:
                recipeFound = _context10.sent;

                if (recipeFound) {
                  _context10.next = 7;
                  break;
                }

                return _context10.abrupt('return', res.status(404).send({ success: false, message: 'recipe does not exist' }));

              case 7:
                userDownvote = {
                  recipeId: recipeId,
                  userId: req.decoded.id
                };
                _context10.next = 10;
                return _models2.default.Downvote.findAll({
                  where: { userId: req.decoded.id, recipeId: recipeId }
                });

              case 10:
                downvoteFound = _context10.sent;

                if (!(downvoteFound.length > 0)) {
                  _context10.next = 13;
                  break;
                }

                return _context10.abrupt('return', res.status(400).send({ success: 'false', message: 'can\'t downvote more than once' }));

              case 13:
                newDownvote = _models2.default.Downvote.create(userDownvote);

                res.status(201).send({ success: 'true', message: 'Recipe downvoted', data: newDownvote });

                if (recipeFound) {
                  recipeFound.increment('downvotes', { where: { id: recipeId } });
                }

                _context10.next = 18;
                return _models2.default.Upvote.findAll({
                  where: { userId: req.decoded.id, recipeId: recipeId }
                });

              case 18:
                UpvoteFound = _context10.sent;


                if (UpvoteFound.length > 0) {
                  _models2.default.Upvote.destroy({
                    where: { userId: req.decoded.id, recipeId: recipeId }
                  });
                  recipeFound.decrement('upvotes', { where: { id: recipeId } });
                }
                _context10.next = 25;
                break;

              case 22:
                _context10.prev = 22;
                _context10.t0 = _context10['catch'](0);

                res.status(500).send({ success: 'false', message: 'Internal server error', error: _context10.t0 });

              case 25:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 22]]);
      }));

      function downvote(_x19, _x20) {
        return _ref10.apply(this, arguments);
      }

      return downvote;
    }()
  }]);

  return RecipeController;
}();

exports.default = RecipeController;
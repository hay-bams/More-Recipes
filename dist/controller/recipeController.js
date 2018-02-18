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

                res.status(201).send({
                  success: 'true',
                  message: 'Recipe Created Successfully',
                  data: newRecipe
                });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'Internal server error',
                  error: _context.t0
                });

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
        var limit, recipes, pages, page, offset, allRecipes, _limit, _recipes, _pages, _page, _offset, _allRecipes;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(Object.keys(req.query).length > 0)) {
                  _context2.next = 19;
                  break;
                }

                if (!(req.query.sort === 'upvotes' && req.query.order === 'desc')) {
                  _context2.next = 17;
                  break;
                }

                limit = 4;
                _context2.next = 6;
                return _models2.default.Recipe.findAndCountAll();

              case 6:
                recipes = _context2.sent;
                pages = Math.ceil(recipes.count / limit);
                page = parseInt(req.params.page, 10);
                offset = page * limit - limit;
                _context2.next = 12;
                return _models2.default.Recipe.findAll({
                  limit: limit,
                  offset: offset
                });

              case 12:
                allRecipes = _context2.sent;

                if (!(allRecipes.length === 0)) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt('return', res.status(200).send({
                  success: 'false',
                  message: 'No recipes at the moment'
                }));

              case 15:
                allRecipes.sort(function (a, b) {
                  return b.upvotes - a.upvotes;
                });
                return _context2.abrupt('return', res.status(200).send({
                  success: 'true',
                  message: 'Recipes found',
                  data: allRecipes,
                  pages: pages
                }));

              case 17:
                _context2.next = 30;
                break;

              case 19:
                _limit = 4;
                _context2.next = 22;
                return _models2.default.Recipe.findAndCountAll();

              case 22:
                _recipes = _context2.sent;
                _pages = Math.ceil(_recipes.count / _limit);
                _page = parseInt(req.params.page, 10);
                _offset = _page * _limit - _limit;
                _context2.next = 28;
                return _models2.default.Recipe.findAll({
                  limit: _limit,
                  offset: _offset
                });

              case 28:
                _allRecipes = _context2.sent;

                if (_allRecipes.length === 0) {
                  res.status(200).send({
                    success: 'false',
                    message: 'No recipes at the moment'
                  });
                } else {
                  res.status(200).send({
                    success: 'true',
                    message: 'Recipes found',
                    data: _allRecipes,
                    pages: _pages
                  });
                }

              case 30:
                _context2.next = 35;
                break;

              case 32:
                _context2.prev = 32;
                _context2.t0 = _context2['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'internal server error',
                  error: _context2.t0
                });

              case 35:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 32]]);
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
                  res.status(200).send({
                    success: 'false',
                    message: 'You have no recipes at the moment'
                  });
                } else {
                  res.status(200).send({
                    success: 'true',
                    message: 'Recipes found',
                    data: userRecipes
                  });
                }
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'internal server error'
                });

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
     * @return {obj} getLatesRecipes
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'getLatestRecipe',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var latestRecipes;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _models2.default.Recipe.findAll({
                  order: [['id', 'DESC']],
                  limit: 4
                });

              case 3:
                latestRecipes = _context4.sent;

                if (latestRecipes.length === 0) {
                  res.status(200).send({
                    success: 'false',
                    message: 'You have no recipes at the moment'
                  });
                } else {
                  res.status(200).send({
                    success: 'true',
                    message: 'Recipes found',
                    data: latestRecipes
                  });
                }
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'internal server error'
                });

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 7]]);
      }));

      function getLatestRecipe(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return getLatestRecipe;
    }()

    /**
     * @return {obj} getPopularRecipes
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'getPopularRecipe',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var popularRecipes;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _models2.default.Recipe.findAll({
                  order: [['upvotes', 'DESC']],
                  limit: 4
                });

              case 3:
                popularRecipes = _context5.sent;

                if (popularRecipes.length === 0) {
                  res.status(200).send({
                    success: 'false',
                    message: 'You have no recipes at the moment'
                  });
                } else {
                  res.status(200).send({
                    success: 'true',
                    message: 'Recipes found',
                    data: popularRecipes
                  });
                }
                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'internal server error'
                });

              case 10:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 7]]);
      }));

      function getPopularRecipe(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return getPopularRecipe;
    }()

    /**
     * @return {obj} getSingleRecipe
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'getSingleRecipe',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var id, userRecipe;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                id = parseInt(req.params.recipeId, 10);
                _context6.next = 4;
                return _models2.default.Recipe.findById(id);

              case 4:
                userRecipe = _context6.sent;

                if (!userRecipe) {
                  res.status(200).send({
                    success: 'false',
                    message: 'Reciope does not exist'
                  });
                } else {
                  res.status(200).send({
                    success: 'true',
                    message: 'Recipe found',
                    data: userRecipe
                  });
                }
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'internal server error'
                });

              case 11:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 8]]);
      }));

      function getSingleRecipe(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return getSingleRecipe;
    }()

    /**
     * @return {obj} updateRecipe
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'updateRecipe',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var id, recipeFound, recipe, updatedRecipe;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                id = parseInt(req.params.recipeId, 10);
                _context7.next = 4;
                return _models2.default.Recipe.findById(id);

              case 4:
                recipeFound = _context7.sent;

                if (recipeFound) {
                  _context7.next = 7;
                  break;
                }

                return _context7.abrupt('return', res.status(404).send({
                  success: 'false',
                  message: 'Recipe does not exist'
                }));

              case 7:
                recipe = {
                  title: req.body.title || recipeFound.title,
                  image: req.body.image || recipeFound.image,
                  instructions: req.body.instructions || recipeFound.instructions,
                  ingredients: req.body.ingredients || recipeFound.ingredients,
                  userId: req.decoded.id
                };

                if (!(recipeFound.userId === req.decoded.id)) {
                  _context7.next = 15;
                  break;
                }

                _context7.next = 11;
                return recipeFound.update(recipe);

              case 11:
                updatedRecipe = _context7.sent;

                res.status(201).send({
                  success: 'true',
                  message: 'Recipe updated successfully',
                  data: updatedRecipe
                });
                _context7.next = 16;
                break;

              case 15:
                res.status(401).send({
                  success: 'false',
                  message: 'you are not authorized to update this recipe'
                });

              case 16:
                _context7.next = 21;
                break;

              case 18:
                _context7.prev = 18;
                _context7.t0 = _context7['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'internal server error',
                  error: _context7.t0
                });

              case 21:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this, [[0, 18]]);
      }));

      function updateRecipe(_x13, _x14) {
        return _ref7.apply(this, arguments);
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
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var id, recipeFound;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                id = parseInt(req.params.recipeId, 10);
                _context8.next = 4;
                return _models2.default.Recipe.findById(id);

              case 4:
                recipeFound = _context8.sent;

                if (recipeFound) {
                  _context8.next = 7;
                  break;
                }

                return _context8.abrupt('return', res.status(404).send({
                  success: 'false',
                  message: 'Recipe does not exist'
                }));

              case 7:

                if (recipeFound.userId === req.decoded.id) {
                  recipeFound.destroy();
                  res.status(200).send({ success: 'true', message: 'Recipe deleted' });
                } else {
                  res.status(401).send({
                    success: 'false',
                    message: 'You are not authorized to delete this recipe'
                  });
                }
                _context8.next = 13;
                break;

              case 10:
                _context8.prev = 10;
                _context8.t0 = _context8['catch'](0);

                res.status(500).send({
                  sucess: 'false',
                  message: 'Internal server error',
                  error: _context8.t0
                });

              case 13:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[0, 10]]);
      }));

      function deleteRecipe(_x15, _x16) {
        return _ref8.apply(this, arguments);
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
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var id, recipeFound, review, newReview;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;

                if (req.body.review) {
                  _context9.next = 3;
                  break;
                }

                return _context9.abrupt('return', res.status(400).send({
                  success: 'false',
                  message: 'The review field is required'
                }));

              case 3:
                id = parseInt(req.params.recipeId, 10);
                _context9.next = 6;
                return _models2.default.Recipe.findById(id);

              case 6:
                recipeFound = _context9.sent;

                if (recipeFound) {
                  _context9.next = 9;
                  break;
                }

                return _context9.abrupt('return', res.status(404).send({
                  success: 'true',
                  message: 'Can\'t add review for a recipe that does not exist'
                }));

              case 9:
                review = {
                  review: req.body.review,
                  userId: req.decoded.id,
                  recipeId: id
                };
                _context9.next = 12;
                return _models2.default.Review.create(review);

              case 12:
                newReview = _context9.sent;

                res.status(201).send({
                  success: 'true',
                  message: 'New review added',
                  data: newReview
                });
                _context9.next = 19;
                break;

              case 16:
                _context9.prev = 16;
                _context9.t0 = _context9['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'internal server error',
                  error: _context9.t0
                });

              case 19:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 16]]);
      }));

      function addReview(_x17, _x18) {
        return _ref9.apply(this, arguments);
      }

      return addReview;
    }()

    /**
     * @return {obj} getRecipeReviews
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'getRecipeReviews',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
        var recipeId, RecipeReviews;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                recipeId = parseInt(req.params.recipeId, 10);
                _context10.next = 4;
                return _models2.default.Review.findAll({
                  where: { recipeId: recipeId }
                });

              case 4:
                RecipeReviews = _context10.sent;

                if (RecipeReviews.length === 0) {
                  res.status(200).send({
                    success: 'false',
                    message: 'recipe has no review at the moment'
                  });
                } else {
                  res.status(200).send({
                    success: 'true',
                    message: 'Reviews found',
                    data: RecipeReviews
                  });
                }
                _context10.next = 11;
                break;

              case 8:
                _context10.prev = 8;
                _context10.t0 = _context10['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'internal server error'
                });

              case 11:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this, [[0, 8]]);
      }));

      function getRecipeReviews(_x19, _x20) {
        return _ref10.apply(this, arguments);
      }

      return getRecipeReviews;
    }()

    /**
     * @returns {obj} getUserFavourites
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'getUserFavourites',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
        var _this = this;

        var limit, userId, favouriteRecipes, pages, page, offset, getUserFav, favourite;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                limit = 3;
                userId = parseInt(req.params.userId, 10);
                _context12.next = 5;
                return _models2.default.Favourite.findAndCountAll({
                  where: { userId: req.decoded.id }
                });

              case 5:
                favouriteRecipes = _context12.sent;
                pages = Math.ceil(favouriteRecipes.count / limit);
                page = parseInt(req.params.page, 10);
                offset = page * limit - limit;
                getUserFav = [];

                if (!(userId === req.decoded.id)) {
                  _context12.next = 19;
                  break;
                }

                _context12.next = 13;
                return _models2.default.Favourite.findAll({
                  where: { userId: req.decoded.id },
                  limit: limit,
                  offset: offset
                });

              case 13:
                favourite = _context12.sent;

                if (!(favourite.length === 0)) {
                  _context12.next = 16;
                  break;
                }

                return _context12.abrupt('return', res.status(200).send({
                  success: 'true', message: 'No favourite recipes'
                }));

              case 16:

                favourite.map(function () {
                  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(userFav, index) {
                    var getFav;
                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            _context11.next = 2;
                            return _models2.default.Recipe.findById(userFav.recipeId);

                          case 2:
                            getFav = _context11.sent;

                            getUserFav.push(getFav);
                            if (favourite.length === index + 1) {
                              res.status(200).send({
                                success: 'true',
                                message: 'Successfully retrieved favourites',
                                data: getUserFav,
                                pages: pages
                              });
                            }

                          case 5:
                          case 'end':
                            return _context11.stop();
                        }
                      }
                    }, _callee11, _this);
                  }));

                  return function (_x23, _x24) {
                    return _ref12.apply(this, arguments);
                  };
                }());
                _context12.next = 20;
                break;

              case 19:
                return _context12.abrupt('return', res.status(400).send({
                  success: 'false',
                  message: 'Please sign in'
                }));

              case 20:
                _context12.next = 25;
                break;

              case 22:
                _context12.prev = 22;
                _context12.t0 = _context12['catch'](0);
                return _context12.abrupt('return', res.status(500).send({
                  success: 'false',
                  message: 'internal server error'
                }));

              case 25:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this, [[0, 22]]);
      }));

      function getUserFavourites(_x21, _x22) {
        return _ref11.apply(this, arguments);
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
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
        var recipeId, favourite, fav, newFav;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                recipeId = parseInt(req.params.recipeId, 10);
                favourite = {
                  recipeId: recipeId,
                  userId: req.decoded.id
                };
                _context13.next = 5;
                return _models2.default.Favourite.findOne({
                  where: { recipeId: recipeId, userId: req.decoded.id }
                });

              case 5:
                fav = _context13.sent;

                if (!fav) {
                  _context13.next = 8;
                  break;
                }

                return _context13.abrupt('return', res.status(400).send({
                  success: 'true',
                  message: 'Recipe already added as favourite'
                }));

              case 8:
                _context13.next = 10;
                return _models2.default.Favourite.create(favourite);

              case 10:
                newFav = _context13.sent;

                res.status(200).send({
                  success: 'true',
                  message: 'Recipe added to favourites',
                  data: newFav
                });
                _context13.next = 17;
                break;

              case 14:
                _context13.prev = 14;
                _context13.t0 = _context13['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'internal server error',
                  error: _context13.t0
                });

              case 17:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this, [[0, 14]]);
      }));

      function addUserFavourite(_x25, _x26) {
        return _ref13.apply(this, arguments);
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
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
        var recipeId, recipeFound, userUpvote, upvoteFound, newUpvote, downvoteFound;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                recipeId = parseInt(req.params.recipeId, 10);
                _context14.next = 4;
                return _models2.default.Recipe.findById(recipeId);

              case 4:
                recipeFound = _context14.sent;

                if (recipeFound) {
                  _context14.next = 7;
                  break;
                }

                return _context14.abrupt('return', res.status(404).send({
                  success: false,
                  message: 'recipe does not exist'
                }));

              case 7:
                userUpvote = {
                  recipeId: recipeId,
                  userId: req.decoded.id
                };
                _context14.next = 10;
                return _models2.default.Upvote.findAll({
                  where: { userId: req.decoded.id, recipeId: recipeId }
                });

              case 10:
                upvoteFound = _context14.sent;

                if (!(upvoteFound.length > 0)) {
                  _context14.next = 13;
                  break;
                }

                return _context14.abrupt('return', res.status(400).send({ success: 'false', message: 'can\'t upvote more than once' }));

              case 13:
                _context14.next = 15;
                return _models2.default.Upvote.create(userUpvote);

              case 15:
                newUpvote = _context14.sent;

                res.status(201).send({
                  success: 'true',
                  message: 'Recipe upvoted',
                  data: newUpvote
                });

                if (recipeFound) {
                  recipeFound.increment('upvotes', { where: { id: recipeId } });
                } else {
                  res.status(500).send({
                    success: 'false',
                    message: 'Can\'t find recipe'
                  });
                }

                _context14.next = 20;
                return _models2.default.Downvote.findAll({
                  where: { userId: req.decoded.id, recipeId: recipeId }
                });

              case 20:
                downvoteFound = _context14.sent;


                if (downvoteFound.length > 0) {
                  _models2.default.Downvote.destroy({
                    where: { userId: req.decoded.id, recipeId: recipeId }
                  });
                  recipeFound.decrement('downvotes', { where: { id: recipeId } });
                }
                _context14.next = 27;
                break;

              case 24:
                _context14.prev = 24;
                _context14.t0 = _context14['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'Internal server error',
                  error: _context14.t0
                });

              case 27:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this, [[0, 24]]);
      }));

      function upvote(_x27, _x28) {
        return _ref14.apply(this, arguments);
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
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
        var recipeId, recipeFound, userDownvote, downvoteFound, newDownvote, UpvoteFound;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                recipeId = parseInt(req.params.recipeId, 10);
                _context15.next = 4;
                return _models2.default.Recipe.findById(recipeId);

              case 4:
                recipeFound = _context15.sent;

                if (recipeFound) {
                  _context15.next = 7;
                  break;
                }

                return _context15.abrupt('return', res.status(404).send({
                  success: false,
                  message: 'recipe does not exist'
                }));

              case 7:
                userDownvote = {
                  recipeId: recipeId,
                  userId: req.decoded.id
                };
                _context15.next = 10;
                return _models2.default.Downvote.findAll({
                  where: { userId: req.decoded.id, recipeId: recipeId }
                });

              case 10:
                downvoteFound = _context15.sent;

                if (!(downvoteFound.length > 0)) {
                  _context15.next = 13;
                  break;
                }

                return _context15.abrupt('return', res.status(400).send({ success: 'false', message: 'can\'t downvote more than once' }));

              case 13:
                newDownvote = _models2.default.Downvote.create(userDownvote);

                res.status(201).send({
                  success: 'true',
                  message: 'Recipe downvoted',
                  data: newDownvote
                });

                if (recipeFound) {
                  recipeFound.increment('downvotes', { where: { id: recipeId } });
                }

                _context15.next = 18;
                return _models2.default.Upvote.findAll({
                  where: { userId: req.decoded.id, recipeId: recipeId }
                });

              case 18:
                UpvoteFound = _context15.sent;


                if (UpvoteFound.length > 0) {
                  _models2.default.Upvote.destroy({
                    where: { userId: req.decoded.id, recipeId: recipeId }
                  });
                  recipeFound.decrement('upvotes', { where: { id: recipeId } });
                }
                _context15.next = 25;
                break;

              case 22:
                _context15.prev = 22;
                _context15.t0 = _context15['catch'](0);

                res.status(500).send({
                  success: 'false',
                  message: 'Internal server error',
                  error: _context15.t0
                });

              case 25:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this, [[0, 22]]);
      }));

      function downvote(_x29, _x30) {
        return _ref15.apply(this, arguments);
      }

      return downvote;
    }()
  }]);

  return RecipeController;
}();

exports.default = RecipeController;
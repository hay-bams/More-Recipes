'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    value: function addRecipe(req, res) {
      var recipe = {
        title: req.body.title,
        image: req.body.image,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        userId: req.decoded.id
      };

      _models2.default.Recipe.create(recipe).then(function (newRecipe) {
        return res.status(201).send({
          success: 'true', message: 'Recipe Created', data: newRecipe
        });
      }).catch(function (err) {
        return res.status(500).send({ success: 'false', message: 'Internal server error', error: err });
      });
    }

    /**
     * @returns {obj} getAllRecipe
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'getAllRecipe',
    value: function getAllRecipe(req, res) {
      if (req.query) {
        if (req.query.sort === 'upvotes' && req.query.order === 'desc') {
          _models2.default.Recipe.findAll().then(function (allRecipes) {
            if (!allRecipes) {
              return res.status(200).send({ success: 'false', message: 'No recipes at the moment' });
            }
            allRecipes.sort(function (a, b) {
              return b.upvotes - a.upvotes;
            });
            return res.status(200).send({ success: 'true', message: 'Recipes found', data: allRecipes });
          }).catch(function (err) {
            return res.status(500).send({ success: 'false', message: 'internal server error', error: err });
          });
        }
      } else {
        _models2.default.Recipe.findAll().then(function (allRecipes) {
          if (!allRecipes) {
            res.status(200).send({ success: 'false', message: 'No recipes at the moment' });
          } else {
            res.status(200).send({ success: 'true', message: 'Recipes found', data: allRecipes });
          }
        });
      }
    }

    /**
     * @return {obj} updateRecipe
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'updateRecipe',
    value: function updateRecipe(req, res) {
      var id = parseInt(req.params.recipeId, 10);
      _models2.default.Recipe.findById(id).then(function (recipeFound) {
        var recipe = {
          title: req.body.title || recipeFound.title,
          image: req.body.image || recipeFound.image,
          instructions: req.body.instructions || recipeFound.instructions,
          ingredients: req.body.ingredients || recipeFound.ingredients,
          userId: req.decoded.id
        };

        if (recipeFound.userId === req.decoded.id) {
          recipeFound.update(recipe).then(function (updatedRecipe) {
            return res.status(201).send({ success: 'true', message: 'Recipe updated successfully', data: updatedRecipe });
          }).catch(function (err) {
            return res.status(500).send({ success: 'false', message: 'internal server error', error: err });
          });
        } else {
          res.status(401).send({ success: 'false', message: 'you are not authorized to update this recipe' });
        }
      });
    }

    /**
     * @return {obj} deleteRecipe
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(req, res) {
      var id = parseInt(req.params.recipeId, 10);
      _models2.default.Recipe.findById(id).then(function (recipeFound) {
        if (recipeFound.userId === req.decoded.id) {
          recipeFound.destroy().then(function () {
            return res.status(200).send({ success: 'true', message: 'Recipe deleted' });
          }).catch(function (err) {
            return res.status(500).send({ sucess: 'false', message: 'Internal server error', error: err });
          });
        } else {
          res.status(401).send({ success: 'false', message: 'You are not authorized to delete this recipe' });
        }
      });
    }

    /**
     * @returns {obj} addReview
     * @param {obj} req
     * @param {obj} res
     */

  }, {
    key: 'addReview',
    value: function addReview(req, res) {
      if (!req.body) {
        return res.status(400).send({ success: 'false', message: 'The review field is required' });
      }

      var id = parseInt(req.params.recipeId, 10);
      var review = {
        review: req.body.review,
        userId: req.decoded.id,
        recipeId: id
      };
      _models2.default.Review.create(review).then(function (newReview) {
        return res.status(201).send({ success: 'true', message: 'New review added', data: newReview });
      }).catch(function (err) {
        return res.status(500).send({ success: 'false', message: 'internal server error', error: err });
      });
    }

    /**
     * @returns {obj} getUserFavourites
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'getUserFavourites',
    value: function getUserFavourites(req, res) {
      var userId = parseInt(req.params.userId, 10);
      if (userId === req.decoded.id) {
        _models2.default.Favourite.findAll({
          where: { userId: req.decoded.id }
        }).then(function (favourite) {
          if (!favourite) return res.status(404).send({ success: 'false', message: 'Pagecould not be found' });

          res.status(200).send({ success: 'true', message: 'Successfully retrieved favourites', data: favourite });
        });
      } else {
        return res.status(400).send({ success: 'false', message: 'Please sign in' });
      }
    }

    /**
     * @return {obj} addUserFavourites
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'addUserFavourite',
    value: function addUserFavourite(req, res) {
      var recipeId = parseInt(req.params.recipeId, 10);
      var favourite = {
        recipeId: recipeId,
        userId: req.decoded.id
      };
      _models2.default.Favourite.create(favourite).then(function (newFav) {
        return res.status(200).send({ success: 'true', message: 'Retrival successful', data: newFav });
      }).catch(function (err) {
        return res.status(500).send({ success: 'false', message: 'internal server error', error: err });
      });
    }

    /**
     * @return {obj} upvote
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'upvote',
    value: function upvote(req, res) {
      var recipeId = parseInt(req.params.recipeId, 10);
      var userUpvote = {
        recipeId: recipeId,
        userId: req.decoded.id
      };

      _models2.default.Upvote.findAll({
        where: {
          userId: req.decoded.id,
          recipeId: recipeId
        }
      }).then(function (upvoteFound) {
        if (upvoteFound.length > 0) {
          return res.status(400).send({ success: 'false', message: 'can\'t upvote more than once' });
        }
        _models2.default.Upvote.create(userUpvote).then(function (newUpvote) {
          return res.status(201).send({ success: 'true', message: 'Recipe upvoted', data: newUpvote });
        }).catch(function (err) {
          return res.status(500).send({ success: 'false', message: 'Internal server error', error: err });
        });

        _models2.default.Recipe.findById(recipeId).then(function (voteFound) {
          if (voteFound) {
            voteFound.increment('upvotes', { where: { id: recipeId } });
          } else {
            res.status(500).send({ success: 'false', message: 'Can\'t find recipe' });
          }

          _models2.default.Downvote.findAll({
            where: {
              userId: req.decoded.id,
              recipeId: recipeId
            }
          }).then(function (DownvoteFound) {
            if (DownvoteFound.length > 0) {
              _models2.default.Downvote.destroy({
                where: {
                  userId: req.decoded.id,
                  recipeId: recipeId
                }
              });
              voteFound.decrement('downvotes', { where: { id: recipeId } });
            }
          });
        });
      }).catch(function (err) {
        return res.status(500).send({ success: 'false', message: 'Internal server error', error: err });
      });
    }

    /**
     * @return {obj} downvote
     * @param {*} req
     * @param {*} res
     */

  }, {
    key: 'downvote',
    value: function downvote(req, res) {
      var recipeId = parseInt(req.params.recipeId, 10);
      var userDownvote = {
        recipeId: recipeId,
        userId: req.decoded.id
      };

      _models2.default.Downvote.findAll({
        where: {
          userId: req.decoded.id,
          recipeId: recipeId
        }
      }).then(function (downvoteFound) {
        if (downvoteFound.length > 0) {
          return res.status(400).send({ success: 'false', message: 'can\'t downvote more than once' });
        }
        _models2.default.Downvote.create(userDownvote).then(function (newDownvote) {
          return res.status(201).send({ success: 'true', message: 'Recipe downvoted', data: newDownvote });
        }).catch(function (err) {
          return res.status(500).send({ success: 'false', message: 'Internal server error', error: err });
        });

        _models2.default.Recipe.findById(recipeId).then(function (voteFound) {
          if (voteFound) {
            voteFound.increment('downvotes', { where: { id: recipeId } });
          } else {
            res.status(500).send({ success: 'false', message: 'Can\'t find recipe' });
          }

          _models2.default.Upvote.findAll({
            where: {
              userId: req.decoded.id,
              recipeId: recipeId
            }
          }).then(function (UpvoteFound) {
            if (UpvoteFound.length > 0) {
              _models2.default.Upvote.destroy({
                where: {
                  userId: req.decoded.id,
                  recipeId: recipeId
                }
              });
              voteFound.decrement('upvotes', { where: { id: recipeId } });
            }
          });
        });
      });
    }
  }]);

  return RecipeController;
}();

exports.default = RecipeController;
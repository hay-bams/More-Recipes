'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _recipeController = require('../controller/recipeController');

var _recipeController2 = _interopRequireDefault(_recipeController);

var _userController = require('../controller/userController');

var _userController2 = _interopRequireDefault(_userController);

var _middleware = require('../controller/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/api/v1/recipes', _recipeController2.default.getAllRecipe);
router.post('/api/v1/recipes', _middleware2.default.validateAddRecipe, _middleware2.default.verifyToken, _recipeController2.default.addRecipe);
router.put('/api/v1/recipes/:recipeId', _middleware2.default.verifyToken, _recipeController2.default.updateRecipe);
router.delete('/api/v1/recipes/:recipeId', _middleware2.default.verifyToken, _recipeController2.default.deleteRecipe);
router.post('/api/v1/recipes/:recipeId/reviews', _middleware2.default.verifyToken, _recipeController2.default.addReview);
router.post('/api/v1/users/signup', _middleware2.default.validateUserSignup, _userController2.default.signup);
router.post('/api/v1/users/signin', _middleware2.default.validateUserSignin, _userController2.default.signin);
router.get('/api/users/:userId/recipes', _middleware2.default.verifyToken, _recipeController2.default.getUserFavourites);
router.get('/api/v1/recipes/:recipeId', _middleware2.default.verifyToken, _recipeController2.default.addUserFavourite);
router.post('/api/v1/recipes/upvote/:recipeId', _middleware2.default.verifyToken, _recipeController2.default.upvote);
router.post('/api/v1/recipes/downvote/:recipeId', _middleware2.default.verifyToken, _recipeController2.default.downvote);

exports.default = router;
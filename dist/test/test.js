'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _recipesPost = require('../seeders/recipesPost');

var _recipesPost2 = _interopRequireDefault(_recipesPost);

var _user = require('../seeders/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = 'This is your guy';

var should = _chai2.default.should();
var user = {};
var createdUserId = void 0;
var createdRecipeId = void 0;
var getToken = void 0;

_chai2.default.use(_chaiHttp2.default);

describe('Api endpoints testing', function () {
  describe('create a new user', function () {
    it('should return 400 and password should match if password does not match confirm password', function (done) {
      var userWithUnmatchedPassword = Object.assign({}, _user2.default);
      delete userWithUnmatchedPassword.confirmPassword;
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(userWithUnmatchedPassword).end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('passowrd should match');
        done();
      });
    });

    it('should return 400 for an invalid email', function (done) {
      var userWithInvalidEmail = Object.assign({}, _user2.default);
      userWithInvalidEmail.email = 'pur.com';
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(userWithInvalidEmail).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should sign up a user and return 201 for a successful signup', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(_user2.default).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql('true');
        res.body.should.have.property('message').eql('User created');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('password');
        done();
      });
    });

    it('should return 403 for an already existing user', function (done) {
      var sameUserData = Object.assign({}, _user2.default);
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(sameUserData).end(function (err, res) {
        res.should.have.status(403);
        res.body.should.have.property('message').eql('Email already registered');
        done();
      });
    });

    it('should return 400 if no email is provided', function (done) {
      var noEmail = Object.assign({}, _user2.default);
      delete noEmail.email;
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(noEmail).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no password is provided', function (done) {
      var noPassword = Object.assign({}, _user2.default);
      delete noPassword.password;
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(noPassword).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no first name is provided', function (done) {
      var noFirstName = Object.assign({}, _user2.default);
      delete noFirstName.firstName;
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(noFirstName).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no last name is provided', function (done) {
      var noLastName = Object.assign({}, _user2.default);
      delete noLastName.lastName;
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(noLastName).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe('User sign in', function () {
    beforeEach(function () {
      user = {
        email: 'topwealth@gmail.com',
        password: 'password'
      };
    });

    it('should return 201 for a successful signin', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(user).end(function (err, res) {
        var token = res.body.token;

        _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
          createdUserId = decoded.id;
        });
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql('true');
        res.body.should.have.property('message').eql('successfully signed in');
        res.body.should.have.property('token');
        getToken = res.body.token;
        done();
      });
    });

    it('should return 400 if no email is provided', function (done) {
      var noEmail = Object.assign({}, _user2.default);
      delete noEmail.email;
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(noEmail).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no password is provided', function (done) {
      var noPassword = Object.assign({}, _user2.default);
      delete noPassword.password;
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(noPassword).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 403 if password is wrong', function (done) {
      var wrongPassword = Object.assign({}, _user2.default);
      wrongPassword.password = 'wrong  password';
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(wrongPassword).end(function (err, res) {
        res.should.have.status(403);
        done();
      });
    });

    it('should return 403 if email is wrong and user is not found', function (done) {
      var wrongEmail = Object.assign({}, _user2.default);
      wrongEmail.email = 'wrongemail@gmail.com';
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(wrongEmail).end(function (err, res) {
        res.should.have.status(403);
        done();
      });
    });
  });

  describe('Add Recipe', function () {
    _recipesPost2.default.recipesPost[0].userId = createdUserId;

    it('should return 400 if no title is provided before adding a recipe', function (done) {
      var noTitle = Object.assign({}, _recipesPost2.default.recipesPost[0]);
      delete noTitle.title;

      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(noTitle).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no instructions is provided before adding a recipe', function (done) {
      var noInstructions = Object.assign({}, _recipesPost2.default.recipesPost[0]);
      delete noInstructions.instructions;

      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(noInstructions).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no ingredients is provided before adding a recipe', function (done) {
      var noIngredients = Object.assign({}, _recipesPost2.default.recipesPost[0]);
      delete noIngredients.ingredients;

      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(noIngredients).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no image is provided before adding a recipe', function (done) {
      var noImage = Object.assign({}, _recipesPost2.default.recipesPost[0]);
      delete noImage.image;

      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(noImage).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 401 if no token is provided before adding a recipe', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(_recipesPost2.default.recipesPost[0]).end(function (err, res) {
        res.should.have.status(401);
        done();
      });
    });

    it('should add a recipes and return a status of 201 if token is provided', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').set('token', getToken).send(_recipesPost2.default.recipesPost[0]).end(function (err, res) {
        createdRecipeId = res.body.data.id;
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
    });

    it('should return user not signed in and 401 if an unauthenticated user attempts to add a recipe', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(_recipesPost2.default.recipesPost[0]).end(function (err, res) {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('user not signed in');
        done();
      });
    });
  });

  describe('Token test', function () {
    var recipe = {
      title: 'test title',
      image: 'test image',
      instructions: 'test instructions',
      ingredients: 'test ingredients',
      userId: 1
    };
    it('should return 401 if a wrong token is provided', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/recipes/1').set('token', 'wrongtoken').send(recipe).end(function (err, res) {
        res.should.have.status(401);
        done();
      });
    });
  });

  describe('Vote a recipe', function () {
    it('should return 401 and user not signed if token is not provided before upvoting a recipe', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/upvote/' + createdRecipeId).send().end(function (err, res) {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('user not signed in');
        done();
      });
    });

    it('should return 401 and user not signed if token is not provided before downvoting a recipe', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/downvote/' + createdRecipeId).send().end(function (err, res) {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('user not signed in');
        done();
      });
    });

    it('should update a recipe and return a status of 201', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/upvote/' + createdRecipeId).set('token', getToken).send().end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('Recipe upvoted');
        done();
      });
    });

    it('should return 400 and can\'t upvote more than once if a user attempts to upvote more than once', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/upvote/' + createdRecipeId).set('token', getToken).send().end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('can\'t upvote more than once');
        done();
      });
    });

    it('should downvote a recipe and return a status 201', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/downvote/' + createdRecipeId).set('token', getToken).send().end(function (err, res) {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('Recipe downvoted');
        done();
      });
    });

    it('should return 400 and can\'t downvote more than once if a user attempts to upvote more than once', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/downvote/' + createdRecipeId).set('token', getToken).send().end(function (err, res) {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('can\'t downvote more than once');
        done();
      });
    });

    it('should return 404 and recipe does not exist if a user attempts to upvote a recipe that does not exist', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/upvote/1000').set('token', getToken).send().end(function (err, res) {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('recipe does not exist');
        done();
      });
    });

    it('should return 404 and recipe does not exist if a user attempts to downvote a recipe that does not exist', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/downvote/1000').set('token', getToken).send().end(function (err, res) {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('recipe does not exist');
        done();
      });
    });
  });

  describe('Get Recipe', function () {
    it('should get all recipes if they exist and return a status of 200', function (done) {
      _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (err, res) {
        res.should.have.status(200);
        res.body.should.have.a('object');
        res.body.data.should.have.a('array');
        res.body.should.have.property('data');
        done();
      });
    });
  });

  describe('Add Review', function () {
    var recipeReview = {
      review: 'my first review'
    };
    it('should return 400 if the review field is empty', function (done) {
      var noReview = Object.assign({}, recipeReview);
      delete noReview.review;
      _chai2.default.request(_app2.default).post('/api/v1/recipes/' + createdRecipeId + '/reviews').set('token', getToken).send(noReview).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 201 for a successful review', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/' + createdRecipeId + '/reviews').set('token', getToken).send(recipeReview).end(function (err, res) {
        res.should.have.status(201);
        done();
      });
    });
  });

  describe('Favourites', function () {
    it('should return a status of 200 if user has no favourite', function (done) {
      _chai2.default.request(_app2.default).get('/api/users/' + createdUserId + '/recipes').set('token', getToken).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });

    it('should return a status of 200 if for successfuly adding favourites', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/' + createdRecipeId).set('token', getToken).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });

    it('should return a status of 400 for attempting to add a recipe as favourite more than  once', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes/' + createdRecipeId).set('token', getToken).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return a status of 200 if user has favourites', function (done) {
      _chai2.default.request(_app2.default).get('/api/users/' + createdUserId + '/recipes').set('token', getToken).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Update Recipe', function () {
    it('should return 404 for updating a recipe that does not exist', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/10000').set('token', getToken).send(_recipesPost2.default.recipesPost[0]).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });

    it('should update a recipe and return 201 if token is provided', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/' + createdRecipeId).set('token', getToken).send(_recipesPost2.default.recipesPost[0]).end(function (err, res) {
        res.should.have.status(201);
        done();
      });
    });

    it('should return user not signed in and a status 401 if token is not provided before updating a recipe', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/' + createdRecipeId).send(_recipesPost2.default.recipesPost[0]).end(function (err, res) {
        res.should.have.status(401);
        done();
      });
    });
  });

  describe('Delete Recipe', function () {
    it('should return 404 for deleting a recipe that does not exist', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/recipes/10').set('token', getToken).send(_recipesPost2.default.recipesPost[0]).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });

    it('should delete a recipes and return a status of 200 if token is provided', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/recipes/' + createdRecipeId).set('token', getToken).send().end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });

    it('should return user not signed in and a status 401 if token is not provided before deleting a recipe', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/recipes/' + createdRecipeId).send(_recipesPost2.default.recipesPost[0]).end(function (err, res) {
        res.should.have.status(401);
        done();
      });
    });
  });

  after(function () {
    _models2.default.User.destroy({
      where: {}
    });

    _models2.default.Recipe.destroy({
      where: {}
    });

    _models2.default.Favourite.destroy({
      where: {}
    });
  });
});
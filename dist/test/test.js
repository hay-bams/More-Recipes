'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var user = {};
var recipe = {};
var getToken = void 0;

_chai2.default.use(_chaiHttp2.default);

describe('Api endpoints testing', function () {
  describe('create a new user', function () {
    beforeEach(function () {
      user = {
        firstName: 'Ayobami',
        lastName: 'Adelakun',
        email: 'topwealth@gmail.com',
        password: 'password',
        confirmPassword: 'password'
      };
    });
    it('should sign up a user and return 201 for a successful signup', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(user).end(function (err, res) {
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
      var sameUserData = Object.assign({}, user);
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(sameUserData).end(function (err, res) {
        res.should.have.status(403);
        done();
      });
    });

    it('should return 400 if no email is provided', function (done) {
      var noEmail = Object.assign({}, user);
      delete noEmail.email;
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(noEmail).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no password is provided', function (done) {
      var noPassword = Object.assign({}, user);
      delete noPassword.password;
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(noPassword).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no first name is provided', function (done) {
      var noFirstName = Object.assign({}, user);
      delete noFirstName.firstName;
      _chai2.default.request(_app2.default).post('/api/v1/users/signup').send(noFirstName).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no last name is provided', function (done) {
      var noLastName = Object.assign({}, user);
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
      var noEmail = Object.assign({}, user);
      delete noEmail.email;
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(noEmail).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no password is provided', function (done) {
      var noPassword = Object.assign({}, user);
      delete noPassword.password;
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(noPassword).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 403 if password is wrong', function (done) {
      var wrongPassword = Object.assign({}, user);
      wrongPassword.password = 'wrong  password';
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(wrongPassword).end(function (err, res) {
        res.should.have.status(403);
        done();
      });
    });

    it('should return 403 if email is wrong and user is not found', function (done) {
      var wrongEmail = Object.assign({}, user);
      wrongEmail.email = 'wrongemail@gmail.com';
      _chai2.default.request(_app2.default).post('/api/v1/users/signin').send(wrongEmail).end(function (err, res) {
        res.should.have.status(403);
        done();
      });
    });
  });

  describe('Add Recipe', function () {
    beforeEach(function () {
      recipe = {
        title: 'test title',
        image: 'test image',
        instructions: 'test instructions',
        ingredients: 'test ingredients',
        userId: 1
      };
    });

    it('should add a recipes and return a status of 201 if token is provided', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').set('token', getToken).send(recipe).end(function (err, res) {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
    });

    it('should return 404 for deleting a recipe that does not exist', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/recipes/10').set('token', getToken).send(recipe).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });

    // it('should delete a recipes and return a status of 200 if token is provided', (done) => {
    //   chai.request(app)
    //     .delete('/api/v1/recipes/1')
    //     .set('token', getToken)
    //     .send(recipe)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       done();
    //     });
    // });

    it('should return 404 for updating a recipe that does not exist', function (done) {
      _chai2.default.request(_app2.default).put('/api/v1/recipes/10').set('token', getToken).send(recipe).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });

    it('should return 401 if no token is provided before adding a recipe', function (done) {
      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(recipe).end(function (err, res) {
        res.should.have.status(401);
        done();
      });
    });

    it('should return 400 if no title is provided', function (done) {
      var noTitle = Object.assign({}, recipe);
      delete noTitle.title;

      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(noTitle).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no instructions is provided', function (done) {
      var noInstructions = Object.assign({}, recipe);
      delete noInstructions.instructions;

      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(noInstructions).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no ingredients is provided', function (done) {
      var noIngredients = Object.assign({}, recipe);
      delete noIngredients.ingredients;

      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(noIngredients).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });

    it('should return 400 if no image is provided', function (done) {
      var noImage = Object.assign({}, recipe);
      delete noImage.image;

      _chai2.default.request(_app2.default).post('/api/v1/recipes').send(noImage).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe('Token test', function () {
    it('should return 401 if a wrong token is provided', function (done) {
      _chai2.default.request(_app2.default).delete('/api/v1/recipes/1').set('token', 'wrongtoken').send(recipe).end(function (err, res) {
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
  });
});
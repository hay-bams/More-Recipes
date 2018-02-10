import chai from 'chai';
import jwt from 'jsonwebtoken';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';
import recipes from '../seeders/recipesPost';
import usersSeed from '../seeders/user';

const secret = 'This is your guy';

const should = chai.should();
let user = {};
let createdUserId;
let createdRecipeId;
let getToken;

chai.use(chaiHttp);

describe('Api endpoints testing', () => {
  describe('create a new user', () => {
    it('should return 400 and password should match if password does not match confirm password', (done) => {
      const userWithUnmatchedPassword = Object.assign({}, usersSeed);
      delete userWithUnmatchedPassword.confirmPassword;
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(userWithUnmatchedPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('passowrd should match');
          done();
        });
    });

    it('should return 400 for an invalid email', (done) => {
      const userWithInvalidEmail = Object.assign({}, usersSeed)
      userWithInvalidEmail.email = 'pur.com';
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(userWithInvalidEmail)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should sign up a user and return 201 for a successful signup', (done) => {
      console.log(usersSeed)
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(usersSeed)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message').eql('User created');
          done();
        });
    });

    it('should return 403 for an already existing user', (done) => {
      const sameUserData = Object.assign({}, usersSeed);
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(sameUserData)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message').eql('Email already registered');
          done();
        });
    });

    it('should return 400 if no email is provided', (done) => {
      const noEmail = Object.assign({}, usersSeed);
      delete noEmail.email;
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(noEmail)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 if no password is provided', (done) => {
      const noPassword = Object.assign({}, usersSeed);
      delete noPassword.password;
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(noPassword)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 if no first name is provided', (done) => {
      const noFirstName = Object.assign({}, usersSeed);
      delete noFirstName.firstName;
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(noFirstName)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 if no last name is provided', (done) => {
      const noLastName = Object.assign({}, usersSeed);
      delete noLastName.lastName;
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(noLastName)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('User sign in', () => {
    beforeEach(() => {
      user = {
        email: 'topwealth@gmail.com',
        password: 'password',
      };
    });

    it('should return 201 for a successful signin', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(user)
        .end((err, res) => {
          const { token } = res.body;
          jwt.verify(token, secret, (err, decoded) => {
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

    it('should return 400 if no email is provided', (done) => {
      const noEmail = Object.assign({}, usersSeed);
      delete noEmail.email;
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(noEmail)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 if no password is provided', (done) => {
      const noPassword = Object.assign({}, usersSeed);
      delete noPassword.password;
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(noPassword)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 403 if password is wrong', (done) => {
      const wrongPassword = Object.assign({}, usersSeed);
      wrongPassword.password = 'wrong  password';
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(wrongPassword)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });

    it('should return 403 if email is wrong and user is not found', (done) => {
      const wrongEmail = Object.assign({}, usersSeed);
      wrongEmail.email = 'wrongemail@gmail.com';
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(wrongEmail)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe('Add Recipe', () => {
    recipes.recipesPost[0].userId = createdUserId;

    it('should return 400 if no title is provided before adding a recipe', (done) => {
      const noTitle = Object.assign({}, recipes.recipesPost[0]);
      delete noTitle.title;

      chai.request(app)
        .post('/api/v1/recipes')
        .send(noTitle)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 if no instructions is provided before adding a recipe', (done) => {
      const noInstructions = Object.assign({}, recipes.recipesPost[0]);
      delete noInstructions.instructions;

      chai.request(app)
        .post('/api/v1/recipes')
        .send(noInstructions)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 if no ingredients is provided before adding a recipe', (done) => {
      const noIngredients = Object.assign({}, recipes.recipesPost[0]);
      delete noIngredients.ingredients;

      chai.request(app)
        .post('/api/v1/recipes')
        .send(noIngredients)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 if no image is provided before adding a recipe', (done) => {
      const noImage = Object.assign({}, recipes.recipesPost[0]);
      delete noImage.image;

      chai.request(app)
        .post('/api/v1/recipes')
        .send(noImage)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 401 if no token is provided before adding a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send(recipes.recipesPost[0])
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should add a recipes and return a status of 201 if token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', getToken)
        .send(recipes.recipesPost[0])
        .end((err, res) => {
          createdRecipeId = res.body.data.id;
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should return user not signed in and 401 if an unauthenticated user attempts to add a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send(recipes.recipesPost[0])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('user not signed in');
          done();
        });
    });
  });

  describe('Token test', () => {
    const recipe = {
      title: 'test title',
      image: 'test image',
      instructions: 'test instructions',
      ingredients: 'test ingredients',
      userId: 1
    };
    it('should return 401 if a wrong token is provided', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/1')
        .set('token', 'wrongtoken')
        .send(recipe)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('Vote a recipe', () => {
    it('should return 401 and user not signed if token is not provided before upvoting a recipe', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/upvote/${createdRecipeId}`)
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('user not signed in');
          done();
        });
    });

    it('should return 401 and user not signed if token is not provided before downvoting a recipe', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/downvote/${createdRecipeId}`)
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('user not signed in');
          done();
        });
    });

    it('should update a recipe and return a status of 201', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/upvote/${createdRecipeId}`)
        .set('token', getToken)
        .send()
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql('Recipe upvoted');
          done();
        });
    });

    it('should downvote a recipe and return a status 201', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/downvote/${createdRecipeId}`)
        .set('token', getToken)
        .send()
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql('Recipe downvoted');
          done();
        });
    });

    it('should return 404 and recipe does not exist if a user attempts to upvote a recipe that does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/upvote/1000')
        .set('token', getToken)
        .send()
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('recipe does not exist');
          done();
        });
    });

    it('should return 404 and recipe does not exist if a user attempts to downvote a recipe that does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/downvote/1000')
        .set('token', getToken)
        .send()
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('recipe does not exist');
          done();
        });
    });
  });

  describe('Get Recipe', () => {
    it('should get all recipes if they exist and return a status of 200', (done) => {
      chai.request(app)
        .get('/api/v1/recipes/page/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.data.should.have.a('array');
          res.body.should.have.property('data');
          done();
        });
    });
  });

  describe('Add Review', () => {
    const recipeReview = {
      review: 'my first review'
    };
    it('should return 400 if the review field is empty', (done) => {
      const noReview = Object.assign({}, recipeReview);
      delete noReview.review;
      chai.request(app)
        .post(`/api/v1/recipes/${createdRecipeId}/reviews`)
        .set('token', getToken)
        .send(noReview)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 201 for a successful review', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${createdRecipeId}/reviews`)
        .set('token', getToken)
        .send(recipeReview)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('Favourites', () => {
    it('should return a status of 200 if user has no favourite', (done) => {
      chai.request(app)
        .get(`/api/users/${createdUserId}/recipes/1`)
        .set('token', getToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a status of 200 if for successfuly adding favourites', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${createdRecipeId}`)
        .set('token', getToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a status of 400 for attempting to add a recipe as favourite more than  once', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${createdRecipeId}`)
        .set('token', getToken)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return a status of 200 if user has favourites', (done) => {
      chai.request(app)
        .get(`/api/users/${createdUserId}/recipes/1`)
        .set('token', getToken)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('Update Recipe', () => {
    it('should return 404 for updating a recipe that does not exist', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/10000')
        .set('token', getToken)
        .send(recipes.recipesPost[0])
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should update a recipe and return 201 if token is provided', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${createdRecipeId}`)
        .set('token', getToken)
        .send(recipes.recipesPost[0])
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('should return user not signed in and a status 401 if token is not provided before updating a recipe', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${createdRecipeId}`)
        .send(recipes.recipesPost[0])
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('Delete Recipe', () => {
    it('should return 404 for deleting a recipe that does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/10')
        .set('token', getToken)
        .send(recipes.recipesPost[0])
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should delete a recipes and return a status of 200 if token is provided', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${createdRecipeId}`)
        .set('token', getToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return user not signed in and a status 401 if token is not provided before deleting a recipe', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${createdRecipeId}`)
        .send(recipes.recipesPost[0])
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  after(() => {
    models.User.destroy({
      where: {}
    });

    models.Recipe.destroy({
      where: {}
    });

    models.Favourite.destroy({
      where: {}
    });
  });
});


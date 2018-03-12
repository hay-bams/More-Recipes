import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../app';
import models from '../models';
import { recipeWithNotitle, recipeWithNoInstructions,
  recipeWithNoIngredients, recipeWithNoImage,
  recipe } from './seeds/recipesPost';
import { validUser, validUser2, validUser3, validUser4,
  validUser5, validUser6, validUser7 } from './seeds/user';

const secret = process.env.SECRET;

const should = chai.should();
let createdUserId;
let createdRecipeId;
let userToken;

chai.use(chaiHttp);

describe('Recipe Controller', () => {
  describe('Add Recipe', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          fullname: 'test2',
          username: 'test2',
          email: 'test2@test.com',
          password: '1234567890',
          confirmPassword: '1234567890'
        })
        .end((error, response) => {
          userToken = response.body.token;
          console.log(userToken, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
          done();
        });
    });
    it('should return 400 if no title is provided', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send(recipeWithNotitle)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('title is required');
          done();
        });
    });

    it('should return 400 if no instructions is provided', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send(recipeWithNoInstructions)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('instruction is required');
          done();
        });
    });

    it('should return 400 if no ingredients is provided', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send(recipeWithNoIngredients)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('ingredient is required');
          done();
        });
    });

    it('should return 400 if no image is provided ', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send(recipeWithNoImage)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('image is required');
          done();
        });
    });

    it('should return 401 if no token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send(recipe)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('user not signed in');
          done();
        });
    });

    it('should add a recipes and return a status of 201', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', 'some token')
        .send(recipe)
        .end((err, res) => {
          createdRecipeId = res.body.data.id;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('Recipe Created Successfully');
        });

      done();
    });

    it('should return 401 if a wrong token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', userToken)
        .send(recipe)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('Invalid username or password.');
          done();
        });
    });
  });

  describe('Vote a recipe', () => {
    it('should return 401 if unathenticated user upvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/upvote/1')
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('user not signed in');
          done();
        });
    });

    it('should return 401 if unathenticated user downvote a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/downvote/1')
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('user not signed in');
          done();
        });
    });

    it('should upvote a recipe and return a status of 201', (done) => {
      
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
        .post('/api/v1/users/signup')
        .send(validUser3)
        .end((err, res) => {
          const { token } = res.body;
          chai.request(app)
            .post('/api/v1/recipes')
            .set('token', token)
            .send(recipe)
            .end((err, res) => {
              chai.request(app)
                .post(`/api/v1/recipes/downvote/${res.body.data.id}`)
                .set('token', token)
                .send()
                .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.have.property('message').eql('Recipe downvoted');
                  done();
                });
            });
        });
    });

    it('should return 404 for upvoting a non-existing recipe', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(validUser4)
        .end((err, res) => {
          chai.request(app)
            .post('/api/v1/recipes/upvote/100000000000')
            .set('token', res.body.token)
            .send()
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message').eql('recipe does not exist');
              done();
            });
        });
    });

    it('should return 404 downvoting a non-existing recipe', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(validUser5)
        .end((err, res) => {
          chai.request(app)
            .post('/api/v1/recipes/downvote/100000000000')
            .set('token', res.body.token)
            .send()
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message').eql('recipe does not exist');
              done();
            });
        });
    });
  });

  describe('Get Recipe', () => {
    afterEach(() => {
      models.User.destroy({
        where: {}
      });

      models.Recipe.destroy({
        where: {}
      });
    });
    it('should get all recipes and return 200', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(validUser6)
        .end((err, res) => {
          const { token } = res.body;
          chai.request(app)
            .post('/api/v1/recipes')
            .set('token', token)
            .send(recipe)
            .end(() => {
              chai.request(app)
                .get('/api/v1/recipes?page=1')
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.a('object');
                  res.body.data.should.have.a('array');
                  res.body.should.have.property('data');
                  done();
                });
            });
        });
    });

    it('should get user recipes and return a status of 200', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(validUser6)
        .end((err, res) => {
          const { token } = res.body;
          const { id } = res.body.user;
          chai.request(app)
            .post('/api/v1/recipes')
            .set('token', token)
            .send(recipe)
            .end(() => {
              chai.request(app)
                .get(`/api/v1/${id}/recipes/`)
                .set('token', token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.a('object');
                  res.body.data.should.have.a('array');
                  res.body.should.have.property('data');
                  done();
                });
            });
        });
    });

    it('should get the latest recipes and return a status of 200', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(validUser6)
        .end((err, res) => {
          const { token } = res.body;
          chai.request(app)
            .post('/api/v1/recipes')
            .set('token', token)
            .send(recipe)
            .end(() => {
              chai.request(app)
                .get('/api/v1/latest/recipes')
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.a('object');
                  res.body.data.should.have.a('array');
                  res.body.should.have.property('data');
                  done();
                });
            });
        });
    });

    it('should get the popular recipes and return a status of 200', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(validUser6)
        .end((err, res) => {
          const { token } = res.body;
          chai.request(app)
            .post('/api/v1/recipes')
            .set('token', token)
            .send(recipe)
            .end(() => {
              chai.request(app)
                .get('/api/v1/popular/recipes')
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.a('object');
                  res.body.data.should.have.a('array');
                  res.body.should.have.property('data');
                  done();
                });
            });
        });
    });

    it('should get a single recipes and return a status of 200', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(validUser6)
        .end((err, res) => {
          const { token } = res.body;
          chai.request(app)
            .post('/api/v1/recipes')
            .set('token', token)
            .send(recipe)
            .end((err, res) => {
              chai.request(app)
                .get(`/api/v1/recipes/${res.body.data.id}`)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.a('object');
                  res.body.data.should.have.a('object');
                  res.body.should.have.property('data');
                  done();
                });
            });
        });
    });

    it('should search recipes and return a status of 200', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(validUser6)
        .end((err, res) => {
          const { token } = res.body;
          chai.request(app)
            .post('/api/v1/recipes')
            .set('token', token)
            .send(recipe)
            .end(() => {
              chai.request(app)
                .get('/api/v1/search/recipes?search=beans&page=1')
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.have.a('object');
                  res.body.data.should.have.a('array');
                  res.body.should.have.property('data');
                  done();
                });
            });
        });
    });
  });

  describe('Review', () => {
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

    it('should get all reviews for a recipe if they exist and return a status of 200', (done) => {
      chai.request(app)
        .get(`/api/v1/reviews/${createdRecipeId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.data.should.have.a('array');
          res.body.should.have.property('data');
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

    it('should delete user favorite recipe and return a status of 200 if token is provided', (done) => {
      chai.request(app)
        .delete(`/api/v1/${createdRecipeId}/recipes`)
        .set('token', getToken)
        .send()
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

    // models.Favourite.destroy({
    //   where: {}
    // });
  });
});



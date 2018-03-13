import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';
import { recipeWithNotitle, recipeWithNoInstructions,
  recipeWithNoIngredients, recipeWithNoImage,
  recipe, recipe2 } from './seeds/recipesPost';
import { validUser } from './seeds/user';

const should = chai.should();
let createdUserId;
let createdRecipeId;
let userToken;

chai.use(chaiHttp);

describe('Recipe API', () => {
  describe('Add Recipe', () => {
    before((done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(validUser)
        .end((error, response) => {
          userToken = response.body.token;
          createdUserId = response.body.user.id;
          done();
        });
    });

    before((done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send(recipe)
        .set('token', userToken)
        .end((err, res) => {
          createdRecipeId = res.body.data.id;
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
        .set('token', userToken)
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
        .set('token', 'wrong token')
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


  describe('Get Recipe', () => {
    it('should get all recipes and return 200', (done) => {
      chai.request(app)
        .get('/api/v1/recipes?page=1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.data.should.have.a('array');
          res.body.should.have.property('message').eql('Recipes found');
          done();
        });
    });

    it('should get user recipes and return a status of 200', (done) => {
      chai.request(app)
        .get(`/api/v1/${createdUserId}/recipes/`)
        .set('token', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.data.should.have.a('array');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('Recipes found');
          done();
        });
    });


    it('should get the latest recipes and return a status of 200', (done) => {
      chai.request(app)
        .get('/api/v1/latest/recipes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.data.should.have.a('array');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('Recipes found');
          done();
        });
    });


    it('should get the popular recipes and return a status of 200', (done) => {
      chai.request(app)
        .get('/api/v1/popular/recipes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.data.should.have.a('array');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('Recipes found');
          done();
        });
    });


    it('should get a single recipes and return a status of 200', (done) => {
      chai.request(app)
        .get(`/api/v1/recipes/${createdRecipeId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.data.should.have.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('Recipe found');
          done();
        });
    });


    it('should search recipes and return a status of 200', (done) => {
      chai.request(app)
        .get('/api/v1/search/recipes?search=beans&page=1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.data.should.have.a('array');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('Recipes found');
          done();
        });
    });
  });

  describe('Update Recipe', () => {
    it('should return 404 for updating a recipe that does not exist', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/10000')
        .set('token', userToken)
        .send(recipe2)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('Recipe does not exist');
          done();
        });
    });

    it('should update a recipe and return 201', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${createdRecipeId}`)
        .set('token', userToken)
        .send(recipe2)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('Recipe updated successfully');
          done();
        });
    });

    it('should not update if token is not provided', (done) => {
      chai.request(app)
        .put(`/api/v1/recipes/${createdRecipeId}`)
        .send(recipe2)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('user not signed in');
          done();
        });
    });
  });

  describe('Delete Recipe', () => {
    it('should return 404 for deleting a recipe that does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/10')
        .set('token', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('Recipe does not exist');
          done();
        });
    });

    it('should delete a recipes and return a status of 200', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${createdRecipeId}`)
        .set('token', userToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('Recipe deleted');
          done();
        });
    });

    it('should not delete if token is not provided', (done) => {
      chai.request(app)
        .delete(`/api/v1/recipes/${createdRecipeId}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('user not signed in');
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


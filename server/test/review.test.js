import chai from 'chai';

import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';
import { recipe } from './seeds/recipesPost';
import { emptyReview, recipeReview } from './seeds/review';
import { validUser } from './seeds/user';

const should = chai.should();
let createdUserId;
let createdRecipeId;
let userToken;

chai.use(chaiHttp);

describe('Recipe Controller', () => {
  describe('Review', () => {
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

    it('should return 400 if the review field is empty', (done) => {
      chai.request(app)
        .post('/api/v1/recipes/1/reviews')
        .set('token', userToken)
        .send(emptyReview)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message').
            eql('The review field is required');
          done();
        });
    });


    it('should return 201 for a successful review', (done) => {
      chai.request(app)
        .post(`/api/v1/recipes/${createdRecipeId}/reviews`)
        .set('token', userToken)
        .send(recipeReview)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message').eql('New review added');
          done();
        });
    });


    it('should get all reviews for a recipe', (done) => {
      chai.request(app)
        .get(`/api/v1/reviews/${createdRecipeId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.data.should.have.a('array');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message').eql('Reviews found');
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


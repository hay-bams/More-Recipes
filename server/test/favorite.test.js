import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';
import { recipe } from './seeds/recipesPost';
import { validUser } from './seeds/user';

const should = chai.should();
let createdUserId;
let createdRecipeId;
let userToken;

chai.use(chaiHttp);


describe('Favourites', () => {
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
  it('should return a status of 200 if user has no favourite', (done) => {
    chai.request(app)
      .get(`/api/users/${createdUserId}/recipes/${createdRecipeId}`)
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

  it('should favourite successfully', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${createdRecipeId}`)
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.a('object');
        res.body.should.have.property('success').eql('true');
        res.body.should.have.property('message')
          .eql('Recipe added to favourites');
        done();
      });
  });

  it('should return 400 for adding favourite more than  once', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/${createdRecipeId}`)
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('success').eql('true');
        res.body.should.have.property('message')
          .eql('Recipe already added as favourite');
        done();
      });
  });

  it('should return a status of 200 if user has favourites', (done) => {
    chai.request(app)
      .get(`/api/users/${createdUserId}/recipes/${createdRecipeId}`)
      .set('token', userToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should delete user favorite recipe and return a status of 200 if token is provided', (done) => {
    chai.request(app)
      .delete(`/api/v1/${createdRecipeId}/recipes`)
      .set('token', userToken)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
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

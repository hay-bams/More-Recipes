import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';
import { recipe } from './seeds/recipesPost';
import { validUser } from './seeds/user';

const should = chai.should();
let createdRecipeId;
let userToken;

chai.use(chaiHttp);

describe('Vote a recipe', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(validUser)
      .end((error, response) => {
        userToken = response.body.token;
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

  it('should return 401 if unathenticated user upvote a recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/upvote/1')
      .send()
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql('false');
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
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql('false');
        res.body.should.have.property('message').eql('user not signed in');
        done();
      });
  });

  it('should upvote a recipe and return a status of 201', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/upvote/${createdRecipeId}`)
      .set('token', userToken)
      .send()
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql('true');
        res.body.should.have.property('message').eql('Recipe upvoted');
        done();
      });
  });

  it('should downvote a recipe and return a status 201', (done) => {
    chai.request(app)
      .post(`/api/v1/recipes/downvote/${createdRecipeId}`)
      .set('token', userToken)
      .send()
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql('true');
        res.body.should.have.property('message').eql('Recipe downvoted');
        done();
      });
  });


  it('should return 404 for upvoting a non-existing recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/upvote/100000000000')
      .set('token', userToken)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('recipe does not exist');
        done();
      });
  });


  it('should return 404 downvoting a non-existing recipe', (done) => {
    chai.request(app)
      .post('/api/v1/recipes/downvote/100000000000')
      .set('token', userToken)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('recipe does not exist');
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

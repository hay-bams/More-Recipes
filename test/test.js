import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import recipeData from '../api/recipeApi';

const should = chai.should();
chai.use(chaiHttp);

describe('Api Routes', () => {
  it('should get all the recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should get all the recipe with the most upvotes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes?sort=upvotes&order=des')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should post a recipe', (done) => {
    const recipe = {
      id: 1,
      user: 'Ayobami',
      title: 'Rice',
      image: 'recipe2.jpg',
      preparation: 'steps to prepare the food',
      upvote: 2,
      downvote: 3
    };
    chai.request(app)
      .post('/api/v1/recipes')
      .send(recipe)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('user');
        res.body.should.have.property('title');
        res.body.should.have.property('image');
        res.body.should.have.property('preparation');
        res.body.should.have.property('upvote');
        res.body.should.have.property('downvote');
        done();
      });
  });

  it('should update a recipe given the id', (done) => {
    const recipe = {
      image: 'recipe2.jpg',
      preparation: 'steps to prepare the food',
    };
    chai.request(app)
      .put('/api/v1/recipes/1')
      .send(recipe)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('user');
        res.body.should.have.property('title');
        res.body.should.have.property('image');
        res.body.should.have.property('preparation');
        res.body.should.have.property('upvote');
        res.body.should.have.property('downvote');
        done();
      });
  });

  it('should delete a recipe given the id', (done) => {
    chai.request(app)
      .delete('/api/v1/recipes/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should add a review to a recipe', (done) => {
    const review = {
      id: 0,
      recipeId: 1,
      username: 'junky51',
      fullName: 'Adekunle Adeola',
      review: 'this is awesome'
    };
    chai.request(app)
      .post('/api/v1/recipes/:id/reviews')
      .send(review)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('recipeId');
        res.body.should.have.property('username');
        res.body.should.have.property('fullName');
        res.body.should.have.property('review');
        done();
      });
  });
});

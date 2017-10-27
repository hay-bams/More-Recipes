import supertest from 'supertest';
import chai from 'chai';
import app from '../app';

const should = chai.should();
const request = supertest(app);

describe('Api Routes', () => {
  describe('GET /', () => {
    it('should get all the recipes', (done) => {
      request
        .get('/api/recipes')
        .end()

    });
  });
});

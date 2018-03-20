
// import { expect } from 'chai';
import chai from 'chai';
import models from '../../models';
import { validUser, noEmail, noFirstName, noLastName } from '../seeds/user';

const should = chai.should();
const { User } = models;

describe('User models', () => {
  
  describe('Create a user', () => {
    it('should not create user if first name is not provided', (done) => {
      User.create(noEmail)
        .catch((err) => {
          err.errors.should.be.a('array');
          err.errors[0].should.have.property('message');
          err.errors[0].should.have.property('message')
            .eql('User.email cannot be null');
          done();
        });
    });

    it('should not create user if first name is not provided', (done) => {
      User.create(noFirstName)
        .catch((err) => {
          err.errors.should.be.a('array');
          err.errors[0].should.have.property('message');
          err.errors[0].should.have.property('message')
            .eql('User.firstName cannot be null');
          done();
        });
    });

    it('should not create recipe if ingredient is not provided', (done) => {
      User.create(noLastName)
        .catch((err) => {
          err.errors.should.be.a('array');
          err.errors[0].should.have.property('message');
          err.errors[0].should.have.property('message')
            .eql('User.lastName cannot be null');
          done();
        });
    });

    it('should create a new user', (done) => {
      User.create(validUser)
        .then((newUser) => {
          newUser.should.be.a('object');
          newUser.id.should.be.a('number');
          newUser.firstName.should.be.a('string');
          newUser.lastName.should.be.a('string');
          newUser.email.should.be.a('string');
          done();
        });
    });
  });

  after(() => {
    User.destroy({
      where: {}
    });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';
import { userUpdate, passwordUpdate, unmatchedPasswordMock,
  invalidEmailMock, validUser, validUser2, existingEmail, noEmail, noPassword,
  noFirstName, noLastName, signInuser1, signInuser2, signInuser3, signInuser4,
  signInuser5, signInuser6 } from './seeds/user';

const should = chai.should();
let userToken;
let createdUserId;

chai.use(chaiHttp);

describe('User Controller', () => {
  describe('User Sign up', () => {
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

    it('should return 400 if password does not match', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(unmatchedPasswordMock)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message').eql('passowrd should match');
          done();
        });
    });

    it('should return 400 for an invalid email', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(invalidEmailMock)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message').eql('invalid email address');
          done();
        });
    });

    it('should return 201 for a successful signup', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(validUser2)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('User created successfully');
          done();
        });
    });

    it('should return 403 for an already existing user', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(existingEmail)
        .end(() => {
          chai.request(app)
            .post('/api/v1/users/signup')
            .send(existingEmail)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.have.property('success').eql('false');
              res.body.should.have.property('message')
                .eql('Email already registered');
              done();
            });
        });
    });

    it('should return 400 if no email is provided', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(noEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('please enter your email');
          done();
        });
    });

    it('should return 400 if no password is provided', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(noPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('please enter your password');
          done();
        });
    });

    it('should return 400 if no first name is provided', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(noFirstName)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('please enter your first name');
          done();
        });
    });

    it('should return 400 if no last name is provided', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(noLastName)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('please enter your last name');
          done();
        });
    });
  });

  describe('User sign in', () => {
    it('should return 201 for a successful signin', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(signInuser1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('successfully signed in');
          res.body.should.have.property('token');
          done();
        });
    });


    it('should update a user profile', async (done) => {
      chai.request(app)
        .put(`/api/v1/user/${createdUserId}`)
        .set('token', userToken)
        .send(userUpdate)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('User updated successfully');
        });
      done();
    });


    it('should update a user password', (done) => {
      chai.request(app)
        .put(`/api/v1/${createdUserId}/user/`)
        .set('token', userToken)
        .send(passwordUpdate)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message')
            .eql('Password updated successfully');
        });

      done();
    });

    it('should return 400 if no email is provided', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(signInuser2)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('please enter your email');
          done();
        });
    });

    it('should return 400 if no password is provided', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(signInuser3)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('please enter your password');
          done();
        });
    });

    it('should return 403 if password is wrong', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(signInuser4)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('wrong password');
          res.should.have.status(403);
          done();
        });
    });

    it('should return 400 if email is wrong', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(signInuser5)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('invalid email address');
          done();
        });
    });


    it('should return 403 if user is not found', (done) => {
      chai.request(app)
        .post('/api/v1/users/signin')
        .send(signInuser6)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('false');
          res.body.should.have.property('message')
            .eql('Incorrect email or password');
          done();
        });
    });
  });

  after(() => {
    models.User.destroy({
      where: {}
    });
  });
});


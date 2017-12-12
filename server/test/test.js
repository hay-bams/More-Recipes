import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';

const should = chai.should();
let user = {};
let recipe = {};
let getToken;

chai.use(chaiHttp);

describe('Api endpoints testing', () => {
  describe('create a new user', () => {
    beforeEach(() => {
      user = {
        firstName: 'Ayobami',
        lastName: 'Adelakun',
        email: 'topwealth@gmail.com',
        password: 'password',
        confirmPassword: 'password'
      };
    });
    it('should sign up a user and return 201 for a successful signup', (done) => {
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('true');
          res.body.should.have.property('message').eql('User created');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('password');
          done();
        });
    });

    it('should return 403 for an already existing user', (done) => {
      const sameUserData = Object.assign({}, user);
      chai.request(app)
        .post('/api/v1/users/signup')
        .send(sameUserData)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });

    it('should return 400 if no email is provided', (done) => {
      const noEmail = Object.assign({}, user);
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
      const noPassword = Object.assign({}, user);
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
      const noFirstName = Object.assign({}, user);
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
      const noLastName = Object.assign({}, user);
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
      const noEmail = Object.assign({}, user);
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
      const noPassword = Object.assign({}, user);
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
      const wrongPassword = Object.assign({}, user);
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
      const wrongEmail = Object.assign({}, user);
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
    before(() => {
      recipe = {
        title: 'test title',
        image: 'test image',
        instructions: 'test instructions',
        ingredients: 'test ingredients',
        userId: 1
      };
    });

    it('should add a recipes and return a status of 201 if token is provided', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .set('token', getToken)
        .send(recipe)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should return user not signed in and 401 if an unauthenticated user attempts to add a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send(recipe)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('user not signed in');
          done();
        });
    });

    it('should return 404 for deleting a recipe that does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/recipes/10')
        .set('token', getToken)
        .send(recipe)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    // it('should delete a recipes and return a status of 200 if token is provided', (done) => {
    //   chai.request(app)
    //     .delete('/api/v1/recipes/1')
    //     .set('token', getToken)
    //     .send(recipe)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       done();
    //     });
    // });

    it('should return 404 for updating a recipe that does not exist', (done) => {
      chai.request(app)
        .put('/api/v1/recipes/10')
        .set('token', getToken)
        .send(recipe)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('should return 401 if no token is provided before adding a recipe', (done) => {
      chai.request(app)
        .post('/api/v1/recipes')
        .send(recipe)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should return 400 if no title is provided', (done) => {
      const noTitle = Object.assign({}, recipe);
      delete noTitle.title;

      chai.request(app)
        .post('/api/v1/recipes')
        .send(noTitle)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 if no instructions is provided', (done) => {
      const noInstructions = Object.assign({}, recipe);
      delete noInstructions.instructions;

      chai.request(app)
        .post('/api/v1/recipes')
        .send(noInstructions)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 if no ingredients is provided', (done) => {
      const noIngredients = Object.assign({}, recipe);
      delete noIngredients.ingredients;

      chai.request(app)
        .post('/api/v1/recipes')
        .send(noIngredients)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return 400 if no image is provided', (done) => {
      const noImage = Object.assign({}, recipe);
      delete noImage.image;

      chai.request(app)
        .post('/api/v1/recipes')
        .send(noImage)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('Token test', () => {
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

  describe('Get Recipe', () => {
    afterEach(() => {
      models.User.destroy({
        where: {}
      });
    });

    it('should get all recipes if they exist', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.should.have.property('data').a('array');
          res.body.should.have.property('data');
          done();
        });
    });

    it('should return no recipe found', (done) => {
      chai.request(app)
        .get('/api/v1/recipes')
        .end((err, res) => {
          res.body.should.have.property('message').eql('No recipes at the moment');
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
  });
});


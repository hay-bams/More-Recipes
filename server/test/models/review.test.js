
// import { expect } from 'chai';
import chai from 'chai';
import models from '../../models';
import { recipe } from '../seeds/recipesPost';
import { validUser } from '../seeds/user';

const should = chai.should();
const { Review, Recipe, User } = models;
let createdRecipeId;
let createdUserId;

describe('Review models', () => {
  before((done) => {
    Recipe.create(recipe)
      .then((newRecipe) => {
        createdRecipeId = newRecipe.id;
        done();
      });
  });

  before((done) => {
    User.create(validUser)
      .then((newUser) => {
        createdUserId = newUser.id;
        done();
      });
  });
  describe('Add Review', () => {
    it('should create a review', (done) => {
      Review.create({
        review: 'this recipe is awesome',
        recipeId: createdRecipeId,
        userId: createdUserId
      })
        .then((newReview) => {
          newReview.should.be.a('object');
          newReview.recipeId.should.be.a('number');
          newReview.userId.should.be.a('number');
          newReview.review.should.be.a('string');
          done();
        });
    });
  });

  after(() => {
    User.destroy({
      where: {}
    });

    Recipe.destroy({
      where: {}
    });

    Review.destroy({
      where: {}
    });
  });
});

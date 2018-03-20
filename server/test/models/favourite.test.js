
// import { expect } from 'chai';
import chai from 'chai';
import models from '../../models';
import { favourite } from '../seeds/favourite';
import { recipe } from '../seeds/recipesPost';
import { validUser } from '../seeds/user';

const should = chai.should();
const { Favourite, Recipe, User } = models;
let createdRecipeId;
let createdUserId;

describe('Favourite models', () => {
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
  describe('Add Favourite', () => {
    it('should not create recipe if title is not provided', (done) => {
      Favourite.create({
        recipeId: createdRecipeId,
        userId: createdUserId
      })
        .then((newFavourite) => {
          newFavourite.should.be.a('object');
          newFavourite.recipeId.should.be.a('number');
          newFavourite.userId.should.be.a('number');
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

    Favourite.destroy({
      where: {}
    });
  });
});

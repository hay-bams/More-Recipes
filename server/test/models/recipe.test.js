
// import { expect } from 'chai';
import chai from 'chai';
import models from '../../models';
import { recipeWithNotitle, recipeWithNoInstructions,
  recipeWithNoIngredients,
  recipe } from '../seeds/recipesPost';

const should = chai.should();
const { Recipe } = models;
let createdRecipeId;

describe('Recipe models', () => {
  describe('Add recipe', () => {
    it('should not create recipe if title is not provided', (done) => {
      Recipe.create(recipeWithNotitle)
        .catch((err) => {
          err.errors.should.be.a('array');
          err.errors[0].should.have.property('message');
          err.errors[0].should.have.property('message')
            .eql('Recipe.title cannot be null');
          done();
        });
    });

    it('should not create recipe if instruction is not provided', (done) => {
      Recipe.create(recipeWithNoInstructions)
        .catch((err) => {
          err.errors.should.be.a('array');
          err.errors[0].should.have.property('message');
          err.errors[0].should.have.property('message')
            .eql('Recipe.instructions cannot be null');
          done();
        });
    });

    it('should not create recipe if ingredient is not provided', (done) => {
      Recipe.create(recipeWithNoIngredients)
        .catch((err) => {
          err.errors.should.be.a('array');
          err.errors[0].should.have.property('message');
          err.errors[0].should.have.property('message')
            .eql('Recipe.ingredients cannot be null');
          done();
        });
    });

    it('should successfully create a recipe', (done) => {
      Recipe.create(recipe)
        .then((newRecipe) => {
          newRecipe.should.be.a('object');
          newRecipe.title.should.be.a('string');
          newRecipe.image.should.be.a('string');
          newRecipe.instructions.should.be.a('string');
          newRecipe.ingredients.should.be.a('string');
          newRecipe.upvotes.should.be.a('number');
          newRecipe.downvotes.should.be.a('number');
          createdRecipeId = newRecipe.id;
          done();
        });
    });
  });

  describe('Get all recipes', () => {
    it('Should get all the recipes', (done) => {
      Recipe.findAll()
        .then((recipes) => {
          recipes.should.be.a('array');
          recipes[0].should.be.a('object');
          done();
        });
    });
  });

  describe('Update a recipe', () => {
    it('Should update a recipe', (done) => {
      Recipe.findById(createdRecipeId)
        .then((theRecipe) => {
          theRecipe.update({
            title: 'Amala'
          }).then((updatedRecipe) => {
            updatedRecipe.should.have.property('title').eql('Amala');
            done();
          });
        });
    });
  });

  describe('Delete recipe', () => {
    it('Should delete a recipe', (done) => {
      Recipe.findById(createdRecipeId)
        .then((theRecipe) => {
          theRecipe.destroy()
            .then((deletedRecipe) => {
              deletedRecipe.should.be.a('array');
              deletedRecipe.length.should.be.eql(0);
              done();
            });
        });
    });
  });
});

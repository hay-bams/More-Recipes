import jwt from 'jsonwebtoken';
import models from '../models';
/**
 * @class Controller
 */
class Controller {
  /**
   * @returns {obj} constructor
   * @param {obj} recipesAndReviews
   * @param {obj} models
   */
  constructor() {
    this.models = models;
    this.jwt = jwt;
    this.secret = 'This is your guy';
  }
  /**
   * @returns {obj} getAllRecipe
   * @param {obj} req
   * @param {obj} res
   */
  getAllRecipe(req, res) {
    if (req.query) {
      if (req.query.sort === 'upvotes' && req.query.order === 'des') {
        this.recipeDetails.recipes.sort((recipe1, recipe2) => recipe2.upvote - recipe1.upvote);
      }
    }
    res.status(200).json(this.recipeDetails.recipes);
  }

  /**
   * @return {obj} updateRecipe
   * @param {obj} req
   * @param {obj} res
   */
  updateRecipe(req, res) {
    const id = parseInt(req.params.id, 10);
    const recipe = this.recipeDetails.recipes.find(oneRecipe => oneRecipe.id === id);

    recipe.image = req.body.image;
    recipe.preparation = req.body.preparation;
    res.status(201).json(recipe);
  }

  /**
   * @return {obj} deleteRecipe
   * @param {obj} req
   * @param {obj} res
   */
  deleteRecipe(req, res) {
    const id = parseInt(req.params.id, 10);
    const recipeId = this.recipeDetails.recipes.findIndex(oneRecipe => oneRecipe.id === id);
    if (recipeId + 1) {
      this.recipeDetails.recipes.splice(recipeId, 1);
      res.status(200).json('recipe deleted');
    } else {
      res.status(404).send('Page not found');
    }
  }

  /**
   * @returns {obj} addReview
   * @param {obj} req
   * @param {obj} res
   */
  addReview(req, res) {
    const id = parseInt(req.params.id, 10);
    const newReview = {
      id: 0,
      recipeId: id,
      username: 'Tola50',
      fullName: 'Tola Oladapo',
      review: 'this is awesome'
    };
    this.recipeDetails.reviews.unshift(newReview);
    res.status(201).json(this.recipeDetails.reviews[0]);
  }
}

const RecipeController = new Controller();
export default RecipeController;

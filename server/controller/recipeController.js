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
   *@returns {obj} addRecipe
   * @param {obj} req
   * @param {obj} res
   */
  addRecipe(req, res) {
    const { token } = req.headers;
    if (!token) return res.status(401).send('No token provided');

    this.jwt.verify(token, this.secret, (err, decoded) => {
      if (err) return res.status(500).send('Failed to authenticate token.');

      const recipe = {
        title: req.body.title,
        image: req.body.image,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        upvote: 0,
        downvote: 0,
        userId: decoded.id
      };
      this.models.Recipe.create(recipe)
        .then(newRecipe => res.status(201).send(newRecipe))
        .catch(err => res.status(201).send(err));
    });
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
    const { token } = req.headers;
    if (!token) return res.status(401).send('No token provided');

    this.jwt.verify(token, this.secret, (err, decoded) => {
      if (err) return res.status(500).send('Failed to authenticate token.');

      const id = parseInt(req.params.id, 10);
      this.models.Recipe.findById(id)
        .then((recipeFound) => {
          const recipe = {
            title: req.body.title || recipeFound.title,
            image: req.body.image || recipeFound.image,
            instructions: req.body.instructions || recipeFound.instructions,
            ingredients: req.body.ingredients || recipeFound.ingredients,
            upvote: recipeFound.upvote,
            downvote: recipeFound.upvote,
            userId: decoded.id
          };
          this.models.Recipe.update(recipe, { where: {
            id: {
              $eq: id
            }
          }
          })
            .then(updatedRecipe => res.status(201).send('Recipe Updated Successfully'))
            .catch(err => res.status(400).send(err));
        });
    });
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

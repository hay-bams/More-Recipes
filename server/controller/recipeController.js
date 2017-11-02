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
    this.models.Recipe.findAll()
      .then((allRecipes) => {
        if (!allRecipes) {
          res.status(401).send('Page not found')
        } else {
          res.status(200).send(allRecipes);
        }
      });
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

      const id = parseInt(req.params.recipeId, 10);
      this.models.Recipe.findById(id)
        .then((recipeFound) => {
          const recipe = {
            title: req.body.title || recipeFound.title,
            image: req.body.image || recipeFound.image,
            instructions: req.body.instructions || recipeFound.instructions,
            ingredients: req.body.ingredients || recipeFound.ingredients,
            userId: decoded.id
          };
          
          if (recipeFound.userId === decoded.id) {
            recipeFound.update(recipe)
              .then(() => res.status(201).send('Recipe Updated Successfully'))
              .catch(err => res.status(400).send(err));
          } else {
            res.status(404).send('You are not authorize to update a recipe that is not yours')
          } 
        });
    });
  }

  /**
   * @return {obj} deleteRecipe
   * @param {obj} req
   * @param {obj} res
   */
  deleteRecipe(req, res) {
    const { token } = req.headers;
    if (!token) return res.status(401).send('No token provided')

    this.jwt.verify(token, this.secret, (err, decoded) => {
      if (err) return res.status(500).send('Failed to authenticate token.');

      const id = parseInt(req.params.recipeId, 10);
      this.models.Recipe.findById(id)
        
        .then((recipeFound) => {
          if (recipeFound.userId === decoded.id) {
            recipeFound.destroy()
              .then(() => res.status(200).send('Recipie deleted'))
              .catch(err => res.status(401).send(err));
          } else {
            res.status(404).send('You are not authorize to delete a recipe that is not yours');
          }
        })
    });
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

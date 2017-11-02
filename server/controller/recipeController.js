import jwt from 'jsonwebtoken';
import models from '../models';

const secret = 'This is your guy';
/**
 * @class Controller
 */
class RecipeController {
  /**
   *@returns {obj} addRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static addRecipe(req, res) {
    if (!req.body.title) {
      return res.status(400).send('title is required');
    } else if (!req.body.instructions) {
      return res.status(400).send('insttruction is required');
    } else if (!req.body.ingredients) {
      return res.status(400).send('ingredinets are required');
    }
    const { token } = req.headers;
    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(500).send('Failed to authenticate token.');

      const recipe = {
        title: req.body.title,
        image: req.body.image,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        userId: decoded.id
      };
      models.Recipe.create(recipe)
        .then(newRecipe => res.status(201).send(newRecipe))
        .catch(err => res.status(201).send(err));
    });
  }

  /**
   * @returns {obj} getAllRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static getAllRecipe(req, res) {
    if (req.query) {
      if (req.query.sort === 'upvotes' && req.query.order === 'des') {
        models.Vote.findAll()
          .then((allVotes) => {
            allVotes.sort((vote1, vote2) => vote2.upvote - vote1.upvote);
            res.status(200).send(allVotes);
          })
          .catch(err => res.status(500).send(err));
      }
    }
    models.Recipe.findAll()
      .then((allRecipes) => {
        if (!allRecipes) {
          res.status(401).send('Page not found');
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
  static updateRecipe(req, res) {
    const { token } = req.headers;
    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(500).send('Failed to authenticate token.');

      const id = parseInt(req.params.recipeId, 10);
      models.Recipe.findById(id)
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
            res.status(404).send('You are not authorize to update a recipe that is not yours');
          }
        });
    });
  }

  /**
   * @return {obj} deleteRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static deleteRecipe(req, res) {
    const { token } = req.headers;
    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(500).send('Failed to authenticate token.');

      const id = parseInt(req.params.recipeId, 10);
      models.Recipe.findById(id)

        .then((recipeFound) => {
          if (recipeFound.userId === decoded.id) {
            recipeFound.destroy()
              .then(() => res.status(200).send('Recipie deleted'))
              .catch(err => res.status(401).send(err));
          } else {
            res.status(404).send('You are not authorize to delete a recipe that is not yours');
          }
        });
    });
  }

  /**
   * @returns {obj} addReview
   * @param {obj} req
   * @param {obj} res
   */
  static addReview(req, res) {
    if (!req.body) {
      return res.status(500).send('the review field is required');
    }
    const { token } = req.headers;
    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(500).send('Failed to authenticate token.');

      const id = parseInt(req.params.recipeId, 10);
      const review = {
        review: req.body.review,
        userId: decoded.id,
        recipeId: id
      };
      models.Review.create(review)
        .then(newReview => res.status(201).send(newReview))
        .catch(err => res.status(201).send(err));
    });
  }

  /**
   * @returns {obj} getUserFavourites
   * @param {*} req
   * @param {*} res
   */
  static getUserFavourites(req, res) {
    const { token } = req.headers;
    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(500).send('Failed to authenticate token.');

      const userId = parseInt(req.params.userId, 10);
      if (userId === decoded.id) {
        models.Favourite.findAll({
          where: { userId: decoded.id }
        })
          .then((favourite) => {
            if (!favourite) return res.status(404).send('Page Not found');

            res.status(200).send(favourite);
          });
      }
    });
  }

  /**
   * @return {obj} addUserFavourites
   * @param {*} req
   * @param {*} res
   */
  static addUserFavourite(req, res) {
    const { token } = req.headers;
    if (!token) return res.status(401).send('No token provided');

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(500).send('Failed to authenticate token.');

      const recipeId = parseInt(req.params.recipeId, 10);
      const favourite = {
        recipeId: recipeId,
        userId: decoded.id
      };
      models.Favourite.create(favourite)
        .then(newFav => res.status(200).send(newFav))
        .catch(err => res.status(500).send(err));
    });
  }
}

export default RecipeController;

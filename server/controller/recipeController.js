import jwt from 'jsonwebtoken';
import models from '../models';

const secret = 'This is your guy';
/**
 * @class RecipeController
 */
class RecipeController {
  /**
   *@returns {obj} addRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static addRecipe(req, res) {
    if (!req.body.title) {
      return res.status(400).send({ success: 'false', message: ' title is required' });
    } else if (!req.body.instructions) {
      return res.status(400).send({ success: 'false', message: 'insttruction is required' });
    } else if (!req.body.ingredients) {
      return res.status(400).send({ success: 'false', message: 'ingredients are required' });
    }
    const { token } = req.headers;
    if (!token) return res.status(401).send({ success: 'false', message: 'user not signed in' });

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(500).send({ success: 'false', message: 'Failed to authenticate token.', error: err });

      const recipe = {
        title: req.body.title,
        image: req.body.image,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        userId: decoded.id
      };
      models.Recipe.create(recipe)
        .then(newRecipe => res.status(201).send({
          success: 'true', message: 'Recipe Created', data: newRecipe
        }))
        .catch(err => res.status(500).send({ success: 'false', message: 'Internal server error', error: err }));
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
            res.status(200).send({ success: 'true', message: 'Recipes found', data: allVotes });
          })
          .catch(err => res.status(500).send({ success: 'false', message: 'internal server error', error: err }));
      }
    }
    models.Recipe.findAll()
      .then((allRecipes) => {
        if (!allRecipes) {
          res.status(401).send({ success: 'false', message: 'Page not found' });
        } else {
          res.status(200).send({ success: 'true', message: 'Recipes found', data: allRecipes });
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
    if (!token) return res.status(403).send({ success: 'false', message: 'Please sign in before updating recipe' });

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(400).send({ success: 'false', message: 'Token could not be verified', error: err });

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
              .then(updatedRecipe => res.status(201).send({ success: 'true', message: 'Recipe updated successfully', data: updatedRecipe }))
              .catch(err => res.status(500).send({ success: 'false', message: 'internal server error', error: err }));
          } else {
            res.status(401).send({ success: 'false', message: 'you are not authorized to update this recipe' });
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
    if (!token) return res.status(403).send({ success: 'false', message: 'Please sign in before deleting recipe' });

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(400).send({ success: 'false', message: 'Token could not be verified', error: err });

      const id = parseInt(req.params.recipeId, 10);
      models.Recipe.findById(id)
        .then((recipeFound) => {
          if (recipeFound.userId === decoded.id) {
            recipeFound.destroy()
              .then(() => res.status(200).send({ success: 'true', message: 'Recipe deleted' }))
              .catch(err => res.status(401).send(err));
          } else {
            res.status(401).send({ success: 'false', message: 'You are not authorized to delete this recipe' });
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
      return res.status(400).send({ success: 'false', message: 'The review field is required' });
    }
    const { token } = req.headers;
    if (!token) return res.status(401).send({ success: 'false', message: 'Please sign in before adding review' });

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(400).send({ success: 'false', message: 'Token could not be verified', error: err });

      const id = parseInt(req.params.recipeId, 10);
      const review = {
        review: req.body.review,
        userId: decoded.id,
        recipeId: id
      };
      models.Review.create(review)
        .then(newReview => res.status(201).send({ success: 'true', message: 'New review added', data: newReview }))
        .catch(err => res.status(500).send({ success: 'false', message: 'internal server error', error: err }));
    });
  }

  /**
   * @returns {obj} getUserFavourites
   * @param {*} req
   * @param {*} res
   */
  static getUserFavourites(req, res) {
    const { token } = req.headers;
    if (!token) return res.status(401).send({ success: 'false', message: 'Please sign in before adding review' });

    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(400).send({ success: 'false', message: 'Token could not be verified', error: err });

      const userId = parseInt(req.params.userId, 10);
      if (userId === decoded.id) {
        models.Favourite.findAll({
          where: { userId: decoded.id }
        })
          .then((favourite) => {
            if (!favourite) return res.status(404).send({ success: 'false', message: 'Pagecould not be found' });

            res.status(200).send({ success: 'true', message: 'Successfully retrieved favourites', data: favourite });
          });
      } else {
        return res.status(400).send({success: 'false', message: 'Please sign in' });
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
        recipeId,
        userId: decoded.id
      };
      models.Favourite.create(favourite)
        .then(newFav => res.status(200).send(newFav))
        .catch(err => res.status(500).send(err));
    });
  }
}

export default RecipeController;

import models from '../models';

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
    const recipe = {
      title: req.body.title,
      image: req.body.image,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      userId: req.decoded.id
    };

    models.Recipe.create(recipe)
      .then(newRecipe => res.status(201).send({
        success: 'true', message: 'Recipe Created', data: newRecipe
      }))
      .catch(err => res.status(500).send({ success: 'false', message: 'Internal server error', error: err }));
  }

  /**
   * @returns {obj} getAllRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static getAllRecipe(req, res) {
    if (req.query) {
      if (req.query.sort === 'upvotes' && req.query.order === 'des') {

      }
    }
    models.Recipe.findAll()
      .then((allRecipes) => {
        if (!allRecipes) {
          res.status(404).send({ success: 'false', message: 'Page not found' });
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
    const id = parseInt(req.params.recipeId, 10);
    models.Recipe.findById(id)
      .then((recipeFound) => {
        const recipe = {
          title: req.body.title || recipeFound.title,
          image: req.body.image || recipeFound.image,
          instructions: req.body.instructions || recipeFound.instructions,
          ingredients: req.body.ingredients || recipeFound.ingredients,
          userId: req.decoded.id
        };

        if (recipeFound.userId === req.decoded.id) {
          recipeFound.update(recipe)
            .then(updatedRecipe => res.status(201).send({ success: 'true', message: 'Recipe updated successfully', data: updatedRecipe }))
            .catch(err => res.status(500).send({ success: 'false', message: 'internal server error', error: err }));
        } else {
          res.status(401).send({ success: 'false', message: 'you are not authorized to update this recipe' });
        }
      });
  }

  /**
   * @return {obj} deleteRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static deleteRecipe(req, res) {
    const id = parseInt(req.params.recipeId, 10);
    models.Recipe.findById(id)
      .then((recipeFound) => {
        if (recipeFound.userId === req.decoded.id) {
          recipeFound.destroy()
            .then(() => res.status(200).send({ success: 'true', message: 'Recipe deleted' }))
            .catch(err => res.status(500).send({ sucess: 'false', message: 'Internal server error', error: err }));
        } else {
          res.status(401).send({ success: 'false', message: 'You are not authorized to delete this recipe' });
        }
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

    const id = parseInt(req.params.recipeId, 10);
    const review = {
      review: req.body.review,
      userId: req.decoded.id,
      recipeId: id
    };
    models.Review.create(review)
      .then(newReview => res.status(201).send({ success: 'true', message: 'New review added', data: newReview }))
      .catch(err => res.status(500).send({ success: 'false', message: 'internal server error', error: err }));
  }

  /**
   * @returns {obj} getUserFavourites
   * @param {*} req
   * @param {*} res
   */
  static getUserFavourites(req, res) {
    const userId = parseInt(req.params.userId, 10);
    if (userId === req.decoded.id) {
      models.Favourite.findAll({
        where: { userId: req.decoded.id }
      })
        .then((favourite) => {
          if (!favourite) return res.status(404).send({ success: 'false', message: 'Pagecould not be found' });

          res.status(200).send({ success: 'true', message: 'Successfully retrieved favourites', data: favourite });
        });
    } else {
      return res.status(400).send({ success: 'false', message: 'Please sign in' });
    }
  }

  /**
   * @return {obj} addUserFavourites
   * @param {*} req
   * @param {*} res
   */
  static addUserFavourite(req, res) {
    const recipeId = parseInt(req.params.recipeId, 10);
    const favourite = {
      recipeId,
      userId: req.decoded.id
    };
    models.Favourite.create(favourite)
      .then(newFav => res.status(200).send({ success: 'true', message: 'Retrival successful', data: newFav }))
      .catch(err => res.status(500).send({ success: 'false', message: 'internal server error', error: err }));
  }

  /**
   * @return {obj} upvote
   * @param {*} req
   * @param {*} res
   */
  static upvote(req, res) {
    const recipeId = parseInt(req.params.recipeId, 10);
    const userUpvote = {
      recipeId,
      userId: req.decoded.id
    };

    models.Upvote.findAll({
      where: {
        userId: req.decoded.id,
        recipeId
      }
    })
      .then((upvoteFound) => {
        if (upvoteFound.length > 0) {
          return res.status(400).send({ success: 'false', message: 'can\'t upvote more than once' });
        }
        models.Upvote.create(userUpvote)
          .then(newUpvote => res.status(201).send({ success: 'true', message: 'Recipe upvoted', data: newUpvote }))
          .catch(err => res.status(500).send({ success: 'false', message: 'Internal server error', error: err }));

        models.Downvote.destroy({
          where: {
            userId: req.decoded.id,
            recipeId
          }
        });
      })
      .catch(err => res.status(500).send({ success: 'false', message: 'Internal server error', error: err }));
  }

  /**
   * @return {obj} downvote
   * @param {*} req
   * @param {*} res
   */
  static downvote(req, res) {
    const recipeId = parseInt(req.params.recipeId, 10);
    const userDownvote = {
      recipeId,
      userId: req.decoded.id
    };

    models.Downvote.findAll({
      where: {
        userId: req.decoded.id,
        recipeId
      }
    })
      .then((downvoteFound) => {
        if (downvoteFound.length > 0) {
          return res.status(400).send({ success: 'false', message: 'can\'t downvote more than once' });
        }
        models.Downvote.create(userDownvote)
          .then(newDownvote => res.status(201).send({ success: 'true', message: 'Recipe downvoted', data: newDownvote }))
          .catch(err => res.status(500).send({ success: 'false', message: 'Internal server error', error: err }));

        models.Upvote.destroy({
          where: {
            userId: req.decoded.id,
            recipeId
          }
        });
      });
  }
}

export default RecipeController;

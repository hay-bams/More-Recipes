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
  static async addRecipe(req, res) {
    try {
      const recipe = {
        title: req.body.title,
        image: req.body.image,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        userId: req.decoded.id
      };

      const newRecipe = await models.Recipe.create(recipe);
      res.status(201).send({
        success: 'true',
        message: 'Recipe Created Successfully',
        data: newRecipe
      });
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'Internal server error',
        error: err
      });
    }
  }

  /**
   * @returns {obj} getAllRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static async getAllRecipe(req, res) {
    try {
      const limit = 4;
      let recipes, pages, page, offset, allRecipes;

      if ((req.query.sort === 'upvotes' || (req.query.sort === 'downvotes')) &&
       (req.query.order === 'desc' || req.query.order === 'asc')) {
        recipes = await models.Recipe.findAndCountAll();
        pages = Math.ceil(recipes.count / limit);
        page = parseInt(req.query.page, 10);
        offset = (page * limit) - limit;
        const sortby = req.query.sort === 'upvotes' ? 'upvotes' : 'downvotes';
        const ordering = req.query.order === 'desc' ? 'DESC' : 'ASC';

        allRecipes = await models.Recipe.findAll({
          order: [
            [sortby, ordering]
          ],
          limit,
          offset
        });
        if (allRecipes.length === 0) {
          return res.status(200).send({
            success: 'false',
            message: 'No recipes at the moment'
          });
        }

        return res.status(200).send({
          success: 'true',
          message: 'Recipes found',
          data: allRecipes,
          pages
        });
      }

      recipes = await models.Recipe.findAndCountAll();
      pages = Math.ceil(recipes.count / limit);
      page = parseInt(req.query.page, 10);
      offset = (page * limit) - limit;
      allRecipes = await models.Recipe.findAll({
        limit,
        offset
      });
      if (allRecipes.length === 0) {
        res.status(200).send({
          success: 'false',
          message: 'No recipes at the moment'
        });
      } else {
        res.status(200).send({
          success: 'true',
          message: 'Recipes found',
          data: allRecipes,
          pages
        });
      }
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error',
        error: err
      });
    }
  }

  /**
   * @return {obj} getUserRecipes
   * @param {obj} req
   * @param {obj} res
   */
  static async getUserRecipes(req, res) {
    try {
      const userRecipes = await models.Recipe.findAll({
        where: { userId: req.decoded.id }
      });
      if (userRecipes.length === 0) {
        res.status(200).send({
          success: 'false',
          message: 'You have no recipes at the moment'
        });
      } else {
        res.status(200).send({
          success: 'true',
          message: 'Recipes found',
          data: userRecipes
        });
      }
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error'
      });
    }
  }

  /**
   * @return {obj} getLatesRecipes
   * @param {obj} req
   * @param {obj} res
   */
  static async getLatestRecipe(req, res) {
    try {
      const latestRecipes = await models.Recipe.findAll({
        order: [
          ['id', 'DESC']
        ],
        limit: 4
      });
      if (latestRecipes.length === 0) {
        res.status(200).send({
          success: 'false',
          message: 'You have no recipes at the moment'
        });
      } else {
        res.status(200).send({
          success: 'true',
          message: 'Recipes found',
          data: latestRecipes
        });
      }
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error'
      });
    }
  }

  /**
   * @return {obj} getPopularRecipes
   * @param {obj} req
   * @param {obj} res
   */
  static async getPopularRecipe(req, res) {
    try {
      const popularRecipes = await models.Recipe.findAll({
        order: [
          ['upvotes', 'DESC']
        ],
        limit: 4
      });
      if (popularRecipes.length === 0) {
        res.status(200).send({
          success: 'false',
          message: 'You have no recipes at the moment'
        });
      } else {
        res.status(200).send({
          success: 'true',
          message: 'Recipes found',
          data: popularRecipes
        });
      }
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error'
      });
    }
  }

  /**
   * @return {obj} getSingleRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static async getSingleRecipe(req, res) {
    try {
      const id = parseInt(req.params.recipeId, 10);
      const userRecipe = await models.Recipe.findById(id);
      if (!userRecipe) {
        return res.status(200).send({
          success: 'false',
          message: 'Recipe does not exist'
        });
      }

      if (userRecipe.userViews === 0 && req.decoded !== undefined &&
        req.decoded.id === userRecipe.userId) {
        const singleRecipe = await userRecipe.update({
          userViews: 1,
          views: userRecipe.views + 1
        });

        return res.status(200).send({
          success: 'true',
          message: 'Recipe found',
          data: singleRecipe
        });
      } else if (userRecipe.userViews > 0 && req.decoded !== undefined &&
         req.decoded.id === userRecipe.userId) {
        return res.status(200).send({
          success: 'true',
          message: 'Recipe found',
          data: userRecipe
        });
      }
      const singleRecipe = await userRecipe.update({ views: userRecipe.views + 1 });
      return res.status(200).send({
        success: 'true',
        message: 'Recipe found',
        data: singleRecipe
      });
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error'
      });
    }
  }

  /**
   * @return {obj} updateRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static async updateRecipe(req, res) {
    try {
      const id = parseInt(req.params.recipeId, 10);
      const recipeFound = await models.Recipe.findById(id);

      if (!recipeFound) {
        return res.status(404).send({
          success: 'false',
          message: 'Recipe does not exist'
        });
      }
      const recipe = {
        title: req.body.title || recipeFound.title,
        image: req.body.image || recipeFound.image,
        instructions: req.body.instructions || recipeFound.instructions,
        ingredients: req.body.ingredients || recipeFound.ingredients,
        userId: req.decoded.id
      };

      if (recipeFound.userId === req.decoded.id) {
        const updatedRecipe = await recipeFound.update(recipe);
        res.status(201).send({
          success: 'true',
          message: 'Recipe updated successfully',
          data: updatedRecipe
        });
      } else {
        res.status(401).send({
          success: 'false',
          message: 'you are not authorized to update this recipe'
        });
      }
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error',
        error: err
      });
    }
  }

  /**
   * @return {obj} deleteRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static async deleteRecipe(req, res) {
    try {
      const id = parseInt(req.params.recipeId, 10);
      const recipeFound = await models.Recipe.findById(id);

      if (!recipeFound) {
        return res.status(404).send({
          success: 'false',
          message: 'Recipe does not exist'
        });
      }

      if (recipeFound.userId === req.decoded.id) {
        recipeFound.destroy();
        res.status(200).send({ success: 'true', message: 'Recipe deleted' });
      } else {
        res.status(401).send({
          success: 'false',
          message: 'You are not authorized to delete this recipe'
        });
      }
    } catch (err) {
      res.status(500).send({
        sucess: 'false',
        message: 'Internal server error',
        error: err
      });
    }
  }

  /**
   * @returns {obj} searchRecipes
   * @param {obj} req
   * @param {obj} res
   */
  static async searchRecipes(req, res) {
    try {
      const limit = 4;
      const { search } = req.query;
      let recipes, pages, page, offset, allRecipes;

      if ((req.query.sort === 'upvotes' || (req.query.sort === 'downvotes')) &&
      (req.query.order === 'desc' || req.query.order === 'asc')) {
        recipes = await models.Recipe.findAndCountAll({
          where: {
            $or: [
              { title: { $ilike: `%${search}%` } },
              { ingredients: { $ilike: `%${search}%` } }
            ]
          }
        });
        pages = Math.ceil(recipes.count / limit);
        page = parseInt(req.query.page, 10);
        offset = (page * limit) - limit;
        const sortby = req.query.sort === 'upvotes' ? 'upvotes' : 'downvotes';
        const ordering = req.query.order === 'desc' ? 'DESC' : 'ASC';
      
        allRecipes = await models.Recipe.findAll({
          where: {
            $or: [
              { title: { $ilike: `%${search}%` } },
              { ingredients: { $ilike: `%${search}%` } }
            ]
          },
          order: [
            [sortby, ordering]
          ],
          limit,
          offset
        });
        if (allRecipes.length === 0) {
          return res.status(200).send({
            success: 'false',
            message: 'No recipes at the moment'
          });
        }

        return res.status(200).send({
          success: 'true',
          message: 'Recipes found',
          data: allRecipes,
          pages
        });
      }

      recipes = await models.Recipe.findAndCountAll({
        where: {
          $or: [
            { title: { $ilike: `%${search}%` } },
            { ingredients: { $ilike: `%${search}%` } }
          ]
        }
      });
      pages = Math.ceil(recipes.count / limit);
      page = parseInt(req.query.page, 10);
      offset = (page * limit) - limit;
      allRecipes = await models.Recipe.findAll({
        where: {
          $or: [
            { title: { $ilike: `%${search}%` } },
            { ingredients: { $ilike: `%${search}%` } }
          ]
        },
        limit,
        offset
      });

      if (allRecipes.length === 0) {
        res.status(200).send({
          success: 'false',
          message: 'No recipes found'
        });
      } else {
        res.status(200).send({
          success: 'true',
          message: 'Recipes found',
          data: allRecipes,
          pages
        });
      }
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error',
        error: err
      });
    }
  }

  /**
   * @returns {obj} addReview
   * @param {obj} req
   * @param {obj} res
   */
  static async addReview(req, res) {
    try {
      if (!req.body.review) {
        return res.status(400).send({
          success: 'false',
          message: 'The review field is required'
        });
      }

      const id = parseInt(req.params.recipeId, 10);
      const recipeFound = await models.Recipe.findById(id);

      if (!recipeFound) {
        return res.status(404).send({
          success: 'true',
          message: 'Can\'t add review for a recipe that does not exist'
        });
      }

      const review = {
        review: req.body.review,
        userId: req.decoded.id,
        recipeId: id
      };
      const newReview = await models.Review.create(review);
      res.status(201).send({
        success: 'true',
        message: 'New review added',
        data: newReview
      });
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error',
        error: err
      });
    }
  }

  /**
   * @return {obj} getRecipeReviews
   * @param {obj} req
   * @param {obj} res
   */
  static async getRecipeReviews(req, res) {
    try {
      const recipeId = parseInt(req.params.recipeId, 10);
      const RecipeReviews = await models.Review.findAll({
        where: { recipeId }
      });
      if (RecipeReviews.length === 0) {
        res.status(200).send({
          success: 'false',
          message: 'recipe has no review at the moment'
        });
      } else {
        res.status(200).send({
          success: 'true',
          message: 'Reviews found',
          data: RecipeReviews
        });
      }
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error'
      });
    }
  }

  /**
   * @returns {obj} getUserFavourites
   * @param {*} req
   * @param {*} res
   */
  static async getUserFavourites(req, res) {
    try {
      const limit = 3;
      const userId = parseInt(req.params.userId, 10);
      const favouriteRecipes = await models.Favourite.findAndCountAll({
        where: { userId: req.decoded.id },
      });
      const pages = Math.ceil(favouriteRecipes.count / limit);
      const page = parseInt(req.params.page, 10);
      const offset = (page * limit) - limit;
      const getUserFav = [];

      if (userId === req.decoded.id) {
        const favourite = await models.Favourite.findAll({
          where: { userId: req.decoded.id },
          limit,
          offset
        });

        if (favourite.length === 0) {
          return res.status(200).send({
            success: 'true', message: 'No favourite recipes'
          });
        }

        favourite.map(async (userFav, index) => {
          const getFav = await models.Recipe.findById(userFav.recipeId);
          getUserFav.push(getFav);
          if (favourite.length === index + 1) {
            res.status(200).send({
              success: 'true',
              message: 'Successfully retrieved favourites',
              data: getUserFav,
              pages
            });
          }
        });
      } else {
        return res.status(400).send({
          success: 'false',
          message: 'Please sign in'
        });
      }
    } catch (err) {
      return res.status(500).send({
        success: 'false',
        message: 'internal server error'
      });
    }
  }

  /**
   * @return {obj} addUserFavourites
   * @param {*} req
   * @param {*} res
   */
  static async addUserFavourite(req, res) {
    try {
      const recipeId = parseInt(req.params.recipeId, 10);
      const favourite = {
        recipeId,
        userId: req.decoded.id
      };

      const fav = await models.Favourite.findOne({
        where: { recipeId, userId: req.decoded.id }
      });

      if (fav) {
        return res.status(400).send({
          success: 'true',
          message: 'Recipe already added as favourite'
        });
      }
      const newFav = await models.Favourite.create(favourite);
      res.status(200).send({
        success: 'true',
        message: 'Recipe added to favourites',
        data: newFav
      });
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'internal server error',
        error: err
      });
    }
  }

  /**
   * @return {obj} deleteRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static async deleteUserFavorite(req, res) {
    try {
      const recipeId = parseInt(req.params.recipeId, 10);
      const favourite = await models.Favourite.findAll({
        where: { userId: req.decoded.id, recipeId }
      });

      if (favourite.length === 0) {
        return res.status(404).send({
          success: 'false',
          message: 'Recipe does not exist'
        });
      }

      if (favourite[0].userId === req.decoded.id) {
        favourite[0].destroy();
        res.status(200).send({ success: 'true', message: 'Favourite deleted' });
      } else {
        res.status(401).send({
          success: 'false',
          message: 'You are not authorized to delete this recipe'
        });
      }
    } catch (err) {
      res.status(500).send({
        sucess: 'false',
        message: 'Internal server error',
        error: err
      });
    }
  }

  /**
   * @return {obj} upvote
   * @param {*} req
   * @param {*} res
   */
  static async upvote(req, res) {
    try {
      const recipeId = parseInt(req.params.recipeId, 10);
      const recipeFound = await models.Recipe.findById(recipeId);

      if (!recipeFound) {
        return res.status(404).send({
          success: false,
          message: 'recipe does not exist'
        });
      }

      const userUpvote = {
        recipeId,
        userId: req.decoded.id
      };

      const upvoteFound = await models.Upvote.findAll({
        where: { userId: req.decoded.id, recipeId }
      });

      if (upvoteFound.length > 0) {
        return res.status(400).send({ success: 'false', message: 'can\'t upvote more than once' });
      }
      const newUpvote = await models.Upvote.create(userUpvote);
      res.status(201).send({
        success: 'true',
        message: 'Recipe upvoted',
        data: newUpvote,
      });

      if (recipeFound) {
        recipeFound.increment('upvotes', { where: { id: recipeId } });
      } else {
        res.status(500).send({
          success: 'false',
          message: 'Can\'t find recipe'
        });
      }

      const downvoteFound = await models.Downvote.findAll({
        where: { userId: req.decoded.id, recipeId }
      });

      if (downvoteFound.length > 0) {
        models.Downvote.destroy({
          where: { userId: req.decoded.id, recipeId }
        });
        recipeFound.decrement('downvotes', { where: { id: recipeId } });
      }
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'Internal server error',
        error: err
      });
    }
  }

  /**
   * @return {obj} downvote
   * @param {*} req
   * @param {*} res
   */
  static async downvote(req, res) {
    try {
      const recipeId = parseInt(req.params.recipeId, 10);
      const recipeFound = await models.Recipe.findById(recipeId);

      if (!recipeFound) {
        return res.status(404).send({
          success: false,
          message: 'recipe does not exist'
        });
      }

      const userDownvote = {
        recipeId,
        userId: req.decoded.id
      };

      const downvoteFound = await models.Downvote.findAll({
        where: { userId: req.decoded.id, recipeId }
      });

      if (downvoteFound.length > 0) {
        return res.status(400).send({ success: 'false', message: 'can\'t downvote more than once' });
      }
      const newDownvote = models.Downvote.create(userDownvote);
      res.status(201).send({
        success: 'true',
        message: 'Recipe downvoted',
        data: newDownvote
      });

      if (recipeFound) {
        recipeFound.increment('downvotes', { where: { id: recipeId } });
      }

      const UpvoteFound = await models.Upvote.findAll({
        where: { userId: req.decoded.id, recipeId }
      });

      if (UpvoteFound.length > 0) {
        models.Upvote.destroy({
          where: { userId: req.decoded.id, recipeId }
        });
        recipeFound.decrement('upvotes', { where: { id: recipeId } });
      }
    } catch (err) {
      res.status(500).send({
        success: 'false',
        message: 'Internal server error',
        error: err
      });
    }
  }
}

export default RecipeController;

import recipeData from '../api/recipeApi';
/**
 * @class Controller
 */
class Controller {
  /**
   *@returns {obj} addRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static addRecipe(req, res) {
    const newRecipe = {
      id: recipeData.recipes.length + 1,
      user: req.body.user,
      title: req.body.title,
      image: req.body.image,
      preparation: req.body.preparation,
      upvote: 0,
      downvote: 0
    };
    recipeData.recipes.unshift(newRecipe);
    res.status(201).json(recipeData.recipes[0]);
  }

  /**
   * @returns {obj} getAllRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static getAllRecipe(req, res) {
    if (req.query) {
      if (req.query.sort === 'upvotes' && req.query.order === 'des') {
        recipeData.recipes.sort((recipe1, recipe2) => recipe2.upvote - recipe1.upvote);
      }
    }
    res.status(200).json(recipeData.recipes);
  }

  /**
   * @return {obj} updateRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static updateRecipe(req, res) {
    const id = parseInt(req.params.id, 10);
    const recipe = recipeData.recipes.find(oneRecipe => oneRecipe.id === id);

    recipe.image = req.body.image;
    recipe.preparation = req.body.preparation;
    res.status(201).json(recipe);
  }

  /**
   * @return {obj} deleteRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static deleteRecipe(req, res) {
    const id = parseInt(req.params.id, 10);
    const recipeId = recipeData.recipes.findIndex(oneRecipe => oneRecipe.id === id);
    if (recipeId + 1) {
      recipeData.recipes.splice(recipeId, 1);
      res.status(200).json('recipe deleted');
    } else {
      res.send('recipe could not be found');
    }
  }

  /**
   * @returns {obj} addReview
   * @param {obj} req
   * @param {obj} res
   */
  static addReview(req, res) {
    const id = parseInt(req.params.id, 10);
    const newReview = {
      id: 0,
      recipeId: id,
      username: 'Tola50',
      fullName: 'Tola Oladapo',
      review: 'this is awesome'
    };
    recipeData.reviewss.unshift(newReview);
    res.status(201).json(recipeData.reviewss[0]);
  }
}
export default Controller;

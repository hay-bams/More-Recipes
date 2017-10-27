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
      id: recipeData.recipe.length + 1,
      user: req.body.user,
      title: req.body.title,
      image: req.body.image,
      preparation: req.body.preparation,
      upvote: 0,
      downvote: 0
    };
    recipeData.recipe.unshift(newRecipe);
    res.status(201).json(recipeData.recipe[0]);
  }

  /**
   * @returns {obj} getAllRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static getAllRecipe(req, res) {
    if (req.query) {
      if (req.query.sort === 'upvotes' && req.query.order === 'des') {
        recipeData.recipe.sort((recipe1, recipe2) => recipe2.upvote - recipe1.upvote);
      }
    }
    res.status(200).json(recipeData.recipe);
  }

  /**
   * @return {obj} updateRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static updateRecipe(req, res) {
    const id = parseInt(req.params.id, 10);
    const recipe = recipeData.recipe.find(oneRecipe => oneRecipe.id === id);

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
    recipeData.recipe.splice(id, 1);
    res.status(200).json('recipe deleted');
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
    recipeData.reviews.unshift(newReview);
    res.status(201).json(recipeData.reviews[0]);
  }
}
export default Controller;

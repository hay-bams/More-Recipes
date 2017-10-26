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
      user: req.body.user,
      title: req.body.title,
      image: req.body.image,
      preparation: req.body.preparation,
    };
    recipeData.recipe.unshift(newRecipe);
    res.json(recipeData.recipe);
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
        console.log(recipeData.recipe);
      }
    }
    res.json(recipeData.recipe);
  }

  /**
   * @return {obj} updateRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static updateRecipe(req, res) {
    const id = parseInt(req.params.id, 10);
    recipeData.recipe.forEach((recipe) => {
      if (recipeData.recipe.id === id) {
        recipeData.recipe.image = 'recipe5';
        recipeData.recipe.preparation = 'update preparations';
      }
      res.json(recipeData.recipe);
    });
  }

  /**
   * @return {obj} deleteRecipe
   * @param {obj} req
   * @param {obj} res
   */
  static deleteRecipe(req, res) {
    const id = parseInt(req.params.id, 10);
    recipeData.recipe.splice(id, 1);
    res.json(recipeData.recipe);
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
    res.json(recipeData.reviews);
  }
}
export default Controller;

/**
 * @class homePage
 */
class homePage {
  /**
     *@returns {obj} addRecipe
     * @param {obj} req
     * @param {obj} res
  */
  static homePage(req, res) {
    res.status(200).send({
      uccess: 'true',
      message: 'Welcome to More Recipes'
    });
  }
}

export default homePage;

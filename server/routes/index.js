
import express from 'express';
// import recipes from '../api/recipe';
import controller from '../controller/recipeController';

const router = express.Router();

router.get('/api/v1/recipes', (req, res) => {
  controller.getAllRecipe(req, res);
});

router.post('/api/v1/recipes', (req, res) => {
  controller.addRecipe(req, res);
});

router.put('/api/v1/recipes/:id', (req, res) => {
  controller.updateRecipe(req, res);
});

router.delete('/api/v1/recipes/:id', (req, res) => {
  controller.deleteRecipe(req, res);
});

router.post('/api/v1/recipes/:id/reviews', (req, res) => {
  controller.addReview(req, res);
});

// DATABASE
router.post('/api/v1/users/signup', (req, res) => {
  controller.signup(req, res);
});

export default router;

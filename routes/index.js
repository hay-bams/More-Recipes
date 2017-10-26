
import express from 'express';
// import recipes from '../api/recipe';
import controller from '../controller/recipeController';


const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 'Hello world': 'Hello' });
});

router.get('/api/recipes', (req, res) => {
  controller.getAllRecipe(req, res);
});

router.post('/api/recipes', (req, res) => {
  controller.addRecipe(req, res);
});

router.put('/api/recipes/:id', (req, res) => {
  controller.updateRecipe(req, res);
});

router.delete('/api/recipes/:id', (req, res) => {
  controller.deleteRecipe(req, res);
});

router.post('/api/recipes/:id/reviews', (req, res) => {
  controller.addReview(req, res);
});

export default router;

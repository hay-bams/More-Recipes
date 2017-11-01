import express from 'express';
import RecipeController from '../controller/recipeController';
import UserController from '../controller/userController';

const router = express.Router();

router.get('/api/v1/recipes', (req, res) => {
  RecipeController.getAllRecipe(req, res);
});

router.post('/api/v1/recipes', (req, res) => {
  RecipeController.addRecipe(req, res);
});

router.put('/api/v1/recipes/:id', (req, res) => {
  RecipeController.updateRecipe(req, res);
});

router.delete('/api/v1/recipes/:id', (req, res) => {
  RecipeController.deleteRecipe(req, res);
});

router.post('/api/v1/recipes/:id/reviews', (req, res) => {
  RecipeController.addReview(req, res);
});

router.post('/api/v1/users/signup', (req, res) => {
  UserController.signup(req, res);
});

router.post('/api/v1/users/signin', (req, res) => {
  UserController.signin(req, res);
});

export default router;

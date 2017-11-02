import express from 'express';
import RecipeController from '../controller/recipeController';
import UserController from '../controller/userController';

const router = express.Router();

router.get('/api/v1/recipes', RecipeController.getAllRecipe);
router.post('/api/v1/recipes', RecipeController.addRecipe);
router.put('/api/v1/recipes/:recipeId', RecipeController.updateRecipe);
router.delete('/api/v1/recipes/:recipeId', RecipeController.deleteRecipe);
router.post('/api/v1/recipes/:recipeId/reviews', RecipeController.addReview);
router.post('/api/v1/users/signup', UserController.signup);
router.post('/api/v1/users/signin', UserController.signin);
router.get('/api/users/:userId/recipes', RecipeController.getUserFavourites);
router.get('/api/v1/recipes/:recipeId', RecipeController.addUserFavourite);

export default router;

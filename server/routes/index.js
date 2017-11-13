import express from 'express';
import RecipeController from '../controller/recipeController';
import UserController from '../controller/userController';
import Middleware from '../controller/middleware';

const router = express.Router();

router.get('/api/v1/recipes', RecipeController.getAllRecipe);
router.post('/api/v1/recipes', Middleware.validateAddRecipe, Middleware.verifyToken, RecipeController.addRecipe);
router.put('/api/v1/recipes/:recipeId', Middleware.verifyToken, RecipeController.updateRecipe);
router.delete('/api/v1/recipes/:recipeId', Middleware.verifyToken, RecipeController.deleteRecipe);
router.post('/api/v1/recipes/:recipeId/reviews', Middleware.verifyToken, RecipeController.addReview);
router.post('/api/v1/users/signup', Middleware.validateUserSignup, UserController.signup);
router.post('/api/v1/users/signin', Middleware.validateUserSignin, UserController.signin);
router.get('/api/users/:userId/recipes', Middleware.verifyToken, RecipeController.getUserFavourites);
router.post('/api/v1/recipes/:recipeId', Middleware.verifyToken, RecipeController.addUserFavourite);
router.post('/api/v1/recipes/upvote/:recipeId', Middleware.verifyToken, RecipeController.upvote);
router.post('/api/v1/recipes/downvote/:recipeId', Middleware.verifyToken, RecipeController.downvote);


export default router;

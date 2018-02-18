import express from 'express';
import HomePage from '../controller/homePage';
import RecipeController from '../controller/recipeController';
import UserController from '../controller/userController';
import Middleware from '../controller/middleware';

const router = express.Router();

//  router.get('/', HomePage.homePage);
router.get('/api/v1/recipes/page/:page', RecipeController.getAllRecipe);
router.get('/api/v1/latest/recipes', RecipeController.getLatestRecipe);
router.get('/api/v1/popular/recipes', RecipeController.getPopularRecipe);
router.get('/api/v1/recipes/:recipeId', RecipeController.getSingleRecipe);
router.get('/api/v1/:userId/recipes/', Middleware.verifyToken, RecipeController.getUserRecipes);
router.post('/api/v1/recipes', Middleware.validateAddRecipe, Middleware.verifyToken, RecipeController.addRecipe);
router.put('/api/v1/recipes/:recipeId', Middleware.verifyToken, RecipeController.updateRecipe);
router.get('/api/v1/reviews/:recipeId', RecipeController.getRecipeReviews);
router.delete('/api/v1/recipes/:recipeId', Middleware.verifyToken, RecipeController.deleteRecipe);
router.post('/api/v1/recipes/:recipeId/reviews', Middleware.verifyToken, RecipeController.addReview);
router.post('/api/v1/users/signup', Middleware.validateUserSignup, UserController.signup);
router.post('/api/v1/users/signin', Middleware.validateUserSignin, UserController.signin);
router.get('/api/v1/users', UserController.findAllUsers);
router.put('/api/v1/user/:userId', UserController.updateProfile);
router.get('/api/users/:userId/recipes/:page', Middleware.verifyToken, RecipeController.getUserFavourites);
router.post('/api/v1/recipes/:recipeId', Middleware.verifyToken, RecipeController.addUserFavourite);
router.post('/api/v1/recipes/upvote/:recipeId', Middleware.verifyToken, RecipeController.upvote);
router.post('/api/v1/recipes/downvote/:recipeId', Middleware.verifyToken, RecipeController.downvote);


export default router;

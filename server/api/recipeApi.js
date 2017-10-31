const reviews =  [
  {
    id: 0,
    recipeId: 1,
    username: 'Tola50',
    fullName: 'Tola Oladapo',
    review: 'this is awesome'
  }
];

const recipes = [
  {
    id: 1,
    userId: 5,
    title: 'Rice',
    image: 'recipe2.jpg',
    preparation: 'steps to prepare the food',
    ingredients: 'maggi',
    upvote: 2,
    downvote: 0
  },
  {
    id: 2,
    userId: 3,
    title: 'Salad',
    image: 'recipe4.jpg',
    preparation: 'steps to prepare the food',
    ingredients: 'maggi',
    upvote: 3,
    downvote: 0
  }
];

export default {
  reviews,
  recipes
};

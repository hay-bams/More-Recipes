

export const recipeResponse = {
  success: true,
  message: 'Recipe Created Successfully',
  data: {
    upvotes: 0,
    downvotes: 0,
    id: 138,
    views: 0,
    userViews: 0,
    title: 'title',
    image: 'image',
    instructions: 'instructiona',
    ingredients: 'ingredeints',
    userId: 16,
    updatedAt: '2018-02-14T23:10:14.931Z',
    createdAt: '2018-02-14T23:10:14.931Z'
  }
};

export const getRecipeResponse = {
  success: 'true',
  message: 'Recipes found',
  data: [
    {
      id: 1,
      title: 'African veg soup',
      image: 'https://res.cloudinary.com/dsj9ygnq2/image/upload/v1520187438/w7j5sv9mpligqz1jxijz.gif',
      ingredients: '½ cup (90g) soft rice ½ cup (60g) boiled rice ½ teaspoon yeast 1 small onion 1 Egg ½ tin Peak Milk Sugar (to taste) 2 pinches of salt Vegetable oil: for frying ',
      instructions: 'Pellentesque elit eget gravida cum. Velit laoreet id donec ultrices tincidunt arcu. Ut tortor pretium viverra suspendisse. Pellentesque id nibh tortor id aliquet lectus. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Varius sit amet mattis vulputate enim nulla aliquet. Dignissim convallis aenean et tortor. Congue eu consequat ac felis donec. Pretium aenean pharetra magna ac placerat. Dictumst quisque sagittis purus sit amet volutpat consequat mauris. Magna fringilla urna porttitor rhoncus dolor purus non enim. Eget egestas purus viverra accumsan in nisl nisi. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Amet nulla facilisi morbi tempus iaculis. Amet purus gravida quis blandit turpis cursus. Quam elementum pulvinar etiam non quam lacus. Eu augue ut lectus arcu bibendum at varius vel pharetra.',
      upvotes: 0,
      downvotes: 0,
      views: 0,
      userViews: 0,
      createdAt: '2018-03-04T18:17:09.838Z',
      updatedAt: '2018-03-04T18:17:09.838Z',
      userId: 1
    }
  ],
  pages: 1
};

export const singleRecipe = {
  success: 'true',
  message: 'Recipe found',
  data: {
    id: 15,
    title: 'African veg soup',
    image: 'https://res.cloudinary.com/dsj9ygnq2/image/upload/v1520187438/w7j5sv9mpligqz1jxijz.gif',
    ingredients: '½ cup (90g) soft rice ½ cup (60g) boiled rice ½ teaspoon yeast 1 small onion 1 Egg ½ tin Peak Milk Sugar (to taste) 2 pinches of salt Vegetable oil: for frying ',
    instructions: 'Pellentesque elit eget gravida cum. Velit laoreet id donec ultrices tincidunt arcu. Ut tortor pretium viverra suspendisse. Pellentesque id nibh tortor id aliquet lectus. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Varius sit amet mattis vulputate enim nulla aliquet. Dignissim convallis aenean et tortor. Congue eu consequat ac felis donec. Pretium aenean pharetra magna ac placerat. Dictumst quisque sagittis purus sit amet volutpat consequat mauris. Magna fringilla urna porttitor rhoncus dolor purus non enim. Eget egestas purus viverra accumsan in nisl nisi. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Amet nulla facilisi morbi tempus iaculis. Amet purus gravida quis blandit turpis cursus. Quam elementum pulvinar etiam non quam lacus. Eu augue ut lectus arcu bibendum at varius vel pharetra.',
    upvotes: 0,
    downvotes: 0,
    views: 1,
    userViews: 0,
    createdAt: '2018-03-04T18:17:09.838Z',
    updatedAt: '2018-03-05T13:44:00.624Z',
    userId: 1
  }
};

export const recipeUpdate = {
  success: 'true',
  message: 'Recipe updated successfully',
  data: {
    id: 1,
    title: 'afang soup',
    image: 'https://res.cloudinary.com/dsj9ygnq2/image/upload/v1519814746/ioj7ff1vrdgmyp7ccm6t.gif',
    ingredients: '3 cauliflower florets 1 egg ½ red onion (sliced) Red bell pepper (chopped) Green bell pepper (chopped) Yellow bell pepper (chopped) 1 button mushroom (sliced) Salt (to taste) 3 strips bacon Mayonnaise (for serving) Carrot Oil (for frying) ',
    instructions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    upvotes: 1,
    downvotes: 0,
    views: 12,
    userViews: 1,
    createdAt: '2018-02-28T10:45:47.891Z',
    updatedAt: '2018-03-05T14:46:11.092Z',
    userId: 1
  }
};

export const updatedUserData = {
  success: 'true',
  message: 'User updated successfully',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9yaAYEodUKZ1jr6gcaT14',
  user: {
    id: 1,
    firstName: 'Ay',
    lastName: 'Ade',
    email: 'purposenigeria@gmail.com'
  }
};

export const updateUserPassword = {
  success: 'true',
  message: 'Password updated successfully',
  data: {
    password: '$2a$08$G5Mj2c7LBMguw/xuh0hdD.jNsxbT4vM0qSXJNE4X6Un0zqdnvFZ8y'
  }
};

export const userData = {
  success: 'true',
  message: 'User created successfully',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZmlyc3ROYW1lIjoiYWRlIiwibGFzdE5hbWUiOiJqb3kiLCJlbWFpbCI6InRvcGFAZ21haWwuY29tIiwiaWF0IjoxNTIwMjU4MzYwLCJleHAiOjE1MjAzNDYwMDB9.UlnX1AfdleUS2gHxQ1LaB_KMhfECt3u97CHDuEz8eEY',
  user: {
    id: 5,
    firstName: 'ade',
    lastName: 'joy',
    email: 'purposenigeria@gmail.com'
  }
};

export const getReview = {
  success: 'true',
  message: 'Reviews found',
  data: [
    {
      id: 4,
      review: 'some review',
      createdAt: '2018-03-05T16:42:24.158Z',
      updatedAt: '2018-03-05T16:42:24.158Z',
      recipeId: 15,
      userId: 5
    }
  ]
};

export const review = {
  success: 'true',
  message: 'New review added',
  data: {
    id: 4,
    review: 'some review',
    userId: 5,
    recipeId: 15,
    updatedAt: '2018-03-05T16:42:24.158Z',
    createdAt: '2018-03-05T16:42:24.158Z'
  }
};

export const allUsers = {
  success: 'true',
  message: 'All Users',
  data: [
    {
      id: 2,
      firstName: 'Adeola',
      lastName: 'Seriki',
      email: 'seriki@gmail.com'
    },
    {
      id: 3,
      firstName: 'Victor',
      lastName: 'Adukwe',
      email: 'vicads01@gmail.com'
    },
    {
      id: 4,
      firstName: 'Vannessa',
      lastName: 'Ating',
      email: 'atingenkay@gmail.com'
    },
    {
      id: 5,
      firstName: 'ade',
      lastName: 'joy',
      email: 'topa@gmail.com'
    },
    {
      id: 1,
      firstName: 'Ay',
      lastName: 'Ade',
      email: 'purposenigeria@gmail.com'
    }
  ]
};


export const upvote = {
  message: 'Recipe upvoted',
  success: 'true',
  data: {
    createdAt: '2018-03-05T17:09:04.294Z',
    id: 14,
    recipeId: 5,
    updatedAt: '2018-03-05T17:09:04.294Z',
    userId: 2
  }
};

export const downvote = {
  message: 'Recipe downvoted',
  success: 'true',
  data: {
    createdAt: '2018-03-05T17:09:04.294Z',
    id: 14,
    recipeId: 5,
    updatedAt: '2018-03-05T17:09:04.294Z',
    userId: 2
  }
};

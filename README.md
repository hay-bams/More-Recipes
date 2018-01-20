[![Build Status](https://travis-ci.org/purpose50/More-Recipes.svg?branch=develope)](https://travis-ci.org/purpose50/More-Recipes)[![Coverage Status](https://coveralls.io/repos/github/purpose50/More-Recipes/badge.svg?branch=develope)](https://coveralls.io/github/purpose50/More-Recipes?branch=develope)[![Maintainability](https://api.codeclimate.com/v1/badges/6753de9e4ea67da6fd09/maintainability)](https://codeclimate.com/github/purpose50/More-Recipes/maintainability)


# MORE-RECIPES

## Introduction
More-Recipes​ provides a platform for users to share the awesome and exciting recipe ideas they
have invented or learnt. Suppose a user comes up with a recipe, he/she can post it on
More-Recipes​ and get feedback in form of reviews and votes from other users who explore that
recipe. Users can also keep a list of their favorite recipes on the application.

## Application Features
* Users can create account by signing up
* Users can login to access their own accounts
* Users can get all recipes
* Users can add recipes
* Users can update their own recipes
* Users can delete their own recipes
* Users can add review to recipes
* Users can favourite a recipe
* Users can get all their fsvourite recipes
* Users can upvote a recipe
* Users can downvote a recipe

## Technology Stack
* NodeJs
* ExpressJs
* Postgresql
* Sequelize ORM
* Bootstrap 4

## Getting Started
* Install Nodejs and postgresql
* clone the repository with this command on your command line interface or bash

```
> git clone https://github.com/purpose50/More-Recipes.git
```
* change into the project directory with the following command

```
> cd more-recipes
```
* install all required dependencies by running the following command

```
> npm install
```

* Migrate your databse schema using

```
npm run migrate
```

* To start the application run

```
npm run start:dev
```

## Testing
* Create a test database and name it more-recipes-test
* run this command
``` 
npm run test 
```

## Application Limitations
* Users can only create account once with their username and email
* Users can login and obtain a token which is verified on every request
* Users will have to obtain a fresh token after 24 hours when their session has expired
* Users will only be able to access the full application functionalities only if they are logged in

**CLIENT SIDE**
*coming soon*

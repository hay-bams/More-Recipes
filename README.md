[![Build Status](https://travis-ci.org/purpose50/More-Recipes.svg?branch=develope)](https://travis-ci.org/purpose50/More-Recipes) [![Coverage Status](https://coveralls.io/repos/github/purpose50/More-Recipes/badge.svg?branch=develope)](https://coveralls.io/github/purpose50/More-Recipes?branch=develope) [![Maintainability](https://api.codeclimate.com/v1/badges/6753de9e4ea67da6fd09/maintainability)](https://codeclimate.com/github/purpose50/More-Recipes/maintainability)


# MORE-RECIPES
---

## Introduction

More-Recipes​ provides a platform for users to share the awesome and exciting recipe ideas they
have invented or learnt. Suppose a user comes up with a recipe, he/she can post it on
More-Recipes​ and get feedback in form of reviews and votes from other users who explore that
recipe. Users can also keep a list of their favorite recipes on the application.

---
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

---
## Technology Stack
* NodeJs
* ExpressJs
* Postgresql
* Sequelize ORM
* Bootstrap 4

---
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

---
## Testing
* Create a test database and name it more-recipes-test
* run this command
``` 
npm run test 
```

---
## Application Limitations
* Users can only create account once with their username and email
* Users can login and obtain a token which is verified on every request
* Users will have to obtain a fresh token after 24 hours when their session has expired
* Users will only be able to access the full application functionalities only if they are logged in

---
## How To Contribute
* Fork this repository to your github account

* Clone the repository 

* Create your feature branch ```git checkout -b {feature, chore or bug}-short_feature_desscription by following this convention <story type>/<story id>/<3-4 word story description>``` Eg: ```chore/111504508/save-the-world```

* Commit your changes ```git commit -m “{commit_message_goes_here}“``` or git commit for the interactive interface by followimng this convention ```<type>(<scope>): <subject>``<BLANK LINE> <body> <BLANK LINE> <footer>``` Eg: ```chore(save-the-world): save the world save the world one line of code at a time [Start #234] or [Finishes #234]```

* Push to the remote branch ```git push origin {your_branch_name_as_described_above}```

* Open a pull request by following this convention ```<story-id> story description``` Eg: ```#869522144 Build HQ for meetings```

* Pull Request should be written in this format

The description should contain the following headings and the related content:

#### What does this PR do?
#### Description of Task to be completed?
#### How should this be manually tested?
#### Any background context you want to provide?
#### What are the relevant pivotal tracker stories?
#### Screenshots (if appropriate)
#### Questions:

---
## Author
Ayobami Adelakun

---
## License

This is licensed for your use, modification and distribution under the [MIT LICENSE](https://github.com/purpose50/More-Recipes/blob/develope/LICENSE)

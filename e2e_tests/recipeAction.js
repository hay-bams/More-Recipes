const path = require('path');
const host = require('./host');
const faker = require('faker');

const firstName = faker.name.findName();
const lastName = faker.name.findName();
const newLastName = faker.name.findName();
const email = faker.internet.email();
const text = faker.lorem.text();
const newText = faker.lorem.text();
const title = faker.name.title();
const newTitle = faker.name.title();
const words = faker.lorem.words();
const imagePath = path.resolve('/Users/andeladeveloper/Desktop/more-recipes/More-Recipes/client/images/recipe7.jpg');

module.exports = {
  'Sign up a new user': client =>
    client
      .url(host.url)
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .waitForElementVisible('div#mainContainer', 1000)
      .pause(2000)
      .click('#signupLink')
      .pause(2000)
      .setValue('input[name=firstName]', firstName)
      .pause(2000)
      .setValue('input[name=lastName]', lastName)
      .pause(2000)
      .setValue('input[name=email]', email)
      .pause(2000)
      .setValue('input[name=password]', '123456')
      .pause(2000)
      .setValue('input[name=confirmPassword]', '123456')
      .pause(2000)
      .click('#registerbutton')
      .pause(2000)
      .click('.nav-link.dropdown-toggle')
      .pause(2000)
      .click('#signoutLink')
      .pause(2000)
      .waitForElementVisible('.container-fluid.main-login-container', 1000)
      .pause(2000),

  'sign in': client =>
    client
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .waitForElementVisible('div#mainContainer', 1000)
      .pause(2000)
      .setValue('input[name=email]', email)
      .pause(2000)
      .setValue('input[name=password]', '123456')
      .pause(2000)
      .click('#signinButton')
      .pause(2000),

  'View all recipes': client =>
    client
      .waitForElementVisible('body', 2000)
      .pause(2000)
      .waitForElementVisible('div#mainContainer', 2000)
      .pause(2000)
      .click('#catalogue')
      .pause(2000),

  'Search recipes': client =>
    client
      .waitForElementVisible('body', 2000)
      .pause(2000)
      .waitForElementVisible('div#mainContainer', 2000)
      .pause(2000)
      .setValue('input[ type="search"]', 'assorted meat')
      .pause(2000)
      .clearValue('input[type=search]')
      .pause(2000)
      .setValue('input[ type="search"]', 'asdf')
      .pause(2000)
      .clearValue('input[type=search]')
      .pause(2000)
      .setValue('input[ type="search"]', 'pepper')
      .pause(2000),

  'Sort Recipe': client =>
    client
      .click('#sortButton')
      .pause(2000)
      .click('#downvotes')
      .pause(2000),

  'Order Recipe': client =>
    client
      .click('#orderButton')
      .pause(2000)
      .click('#desc')
      .pause(2000),

  'View single recipe': client =>
    client
      .assert.visible('#viewDetails')
      .assert
      .containsText('#viewDetails', 'view details')
      .pause(2000)
      .execute(function ()  {
        document.querySelector('#viewDetails').scrollIntoView();
      }, ['#viewDetails'])
      .pause(2000)
      .click('#viewDetails')
      .pause(2000)
      .assert.visible('#recipeDetails')
      .pause(2000),


  'upvote recipe': client =>
    client
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .waitForElementVisible('div#mainContainer', 1000)
      .pause(2000)
      .click('#upvote')
      .pause(2000),

  'downvote recipe': client =>
    client
      .waitForElementVisible('#downvote', 1000)
      .pause(2000)
      .assert.visible('#downvote')
      .click('#downvote')
      .pause(2000),

  'favourite a recipe': client =>
    client
      .waitForElementVisible('#favourite', 7000)
      .pause(2000)
      .assert.visible('#favourite')
      .waitForElementPresent('#favourite', 5000)
      .assert.elementPresent('#favourite')
      .click('#favourite')
      .pause(2000),

  'Add Recipe Action': client =>
    client
      .click('.nav-link.dropdown-toggle')
      .pause(2000)
      .click('#addRecipe')
      .pause(2000)
      .waitForElementVisible('body', 5000)
      .pause(5000)
      .waitForElementVisible('div#mainContainer', 5000)
      .pause(5000)
      .click('input[type=submit]')
      .pause(2000)
      .setValue('input[type="file"]', imagePath)
      .pause(2000)
      .setValue('input[name=title]', title)
      .pause(2000)
      .setValue('input[name=ingredients]', words)
      .pause(2000)
      .setValue('#instructions', text)
      .pause(2000)
      .click('input[type=submit]')
      .pause(2000),

  'Favourite Recipe Action': client =>
    client
      .waitForElementVisible('#userRecipePage', 20000)
      .pause(2000)
      .click('.nav-link.dropdown-toggle')
      .pause(2000)
      .click('#favouriteRecipe')
      .pause(2000)
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .waitForElementVisible('div#mainContainer', 1000)
      .pause(2000)
      .click('.btn.btn-outline-info.ml-2')
      .pause(2000)
      .click('.react-confirm-alert-button-group > button:nth-child(2)')
      .pause(2000),

  'Edit Recipe Action': client =>
    client
      .click('.nav-link.dropdown-toggle')
      .pause(2000)
      .click('#addRecipe')
      .pause(2000)
      .waitForElementVisible('#instructions', 1000)
      .pause(2000)
      .setValue('input[type="file"]', imagePath)
      .pause(2000)
      .setValue('input[name=title]', newTitle)
      .pause(2000)
      .setValue('input[name=ingredients]', words)
      .pause(2000)
      .setValue('#instructions', newText)
      .pause(2000)
      .click('input[type=submit]')
      .pause(2000)
      .waitForElementVisible('#editRecipe', 20000)
      .click('#editRecipe')
      .pause(2000)
      .click('input[type=submit]')
      .pause(2000),

  'Edit User Profile Action': client =>
    client
      .click('.nav-link.dropdown-toggle')
      .pause(2000)
      .click('#editProfile')
      .pause(2000)
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .waitForElementVisible('div#mainContainer', 1000)
      .pause(2000)
      .clearValue('input[name=firstName]')
      .pause(200)
      .clearValue('input[name=firstName]')
      .pause(200)
      .setValue('input[name=lastName]', newLastName)
      .pause(200)
      .click('input[type=submit]')
      .pause(2000),

  'Edit Password': client =>
    client
      .click('.nav-link.dropdown-toggle')
      .pause(2000)
      .click('#editPassword')
      .pause(2000)
      .waitForElementVisible('body', 1000)
      .pause(2000)
      .waitForElementVisible('div#mainContainer', 1000)
      .pause(2000)
      .clearValue('input[name=password]')
      .pause(2000)
      .clearValue('input[name=confirmPassword]')
      .pause(2000)
      .setValue('input[name=password]', '456789')
      .pause(2000)
      .setValue('input[name=confirmPassword]', '456789')
      .pause(2000)
      .click('input[type=submit]')
      .pause(2000)
      .click('.nav-link.dropdown-toggle')
      .pause(2000)
      .click('#signoutLink')
      .pause(2000)
      .end()
};


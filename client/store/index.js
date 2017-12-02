import APPCONSTANT from '../constant';
import allReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';

const consoleMessages = store => next => (action) => {

  console.groupCollapsed(`dispatching action => ${action.type}`)
  const result = next(action)

  const { users, recipe } = store.getState();

  console.log(`
 
    users: ${users.length}
    recipe: ${recipe.length}
  `)

  console.groupEnd();

  return result; 
}

export default (initialState = {}) =>
  applyMiddleware(consoleMessages)(createStore)(allReducer, initialState)
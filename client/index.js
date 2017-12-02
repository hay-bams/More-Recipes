import { createStore } from 'redux';
import allReducers from './store/reducers';
import initialState from './initial.json';
import { signUp, getAllRecipe, addRecipe } from './actions/actions.js';
//import storeFactory from './store';

// const initialState = localStorage['redux-store'] ?
//   JSON.parse(localStorage['redux-store']) :
//   {}
  
const store = createStore(allReducers, initialState);

const saveState = () => {
  // const state = JSON.stringify(store.getState());
  // localStorage['redux-store'] = state;
  console.log('State dispatch')
}

//const store = storeFactory(initialState);

store.subscribe(saveState);

store.dispatch(
  signUp(67, 'Ayobami', 'Adelakun', 'image.jpg', 'test@gmail.com', 'test passowrd', 'date created', 'date updated')
);

store.dispatch(
  addRecipe('Beans', 'beans.jpg', ['salt', 'palmoil'], 'how to ake beans food', 32, 'some date', 'some date', 4)
);

store.dispatch(getAllRecipe());

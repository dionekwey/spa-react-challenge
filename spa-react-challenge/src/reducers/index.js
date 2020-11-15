import { combineReducers } from 'redux';
import heroes from './heroes';
import favorites from './favorites';

export default combineReducers({
    heroes, favorites
});
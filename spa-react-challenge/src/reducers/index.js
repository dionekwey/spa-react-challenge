import { combineReducers } from 'redux';
import globalReducer from '../globalRedux/reducer';

export default combineReducers({
  global: globalReducer
});
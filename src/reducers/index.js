import { combineReducers } from 'redux';

import bible from './bible';
import guide from './guide';
import warta from './warta'

export default combineReducers({
  bible,
  guide,
  warta
});

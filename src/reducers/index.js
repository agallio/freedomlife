import { combineReducers } from 'redux';

import bible from './bible';
import guide from './guide';

export default combineReducers({
  bible,
  guide
});

import { combineReducers } from 'redux';
import projectsState from './projects'
import generatorsState from './generators';

const rootReducer = combineReducers({
	projectsState,
	generatorsState
});

export default rootReducer;
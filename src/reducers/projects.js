import {
	ADD_PROJECT,
	LOAD_PROJECTS,
	SELECT_PROJECT
} from '../actions/projects';

const initialState = {
	projects: [],
	selectedProject: null
}
export default function(state = initialState, { type, payload }) {
	switch (type) {
		case ADD_PROJECT:
			return { ...state, projects: [ ...state.projects, payload ] };
		case LOAD_PROJECTS:
			return { ...state, projects: payload };
		case SELECT_PROJECT:
			return { ...state, selectedProject: payload };
		default:
			return { ...state };
	}
}

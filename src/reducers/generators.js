import {
	LOAD_GENERATORS,
	LOAD_GENERATOR,
	RESET_GENERATOR,
	PLOP_FILES
} from '../actions/generators'

const initialState = {
	generators: [],
	generator: null,
	outcome: null
}

export default function(state = initialState, { type, payload }) {
	switch (type) {
		case LOAD_GENERATORS:
			return { ...state, generators: payload };
		case LOAD_GENERATOR:
			return { ...state, generator: payload };
		case RESET_GENERATOR:
			return { ...state, generator: null, outcome: null };
		case PLOP_FILES:
			return { ...state, outcome: payload, generator: null }
		default:
			return state;
	}
}

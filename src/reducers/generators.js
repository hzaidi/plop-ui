import {
	LOAD_GENERATORS,
	LOAD_GENERATOR
} from '../actions/generators'

const initialState = {
	generators: [],
	generator: null
}

export default function(state = initialState, { type, payload }) {
	switch (type) {
		case LOAD_GENERATORS:
			return { ...state, generators: payload };
		case LOAD_GENERATOR:
			return { ...state, generator: payload };
		default:
			return state;
	}
}
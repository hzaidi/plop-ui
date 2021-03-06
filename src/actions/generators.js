export const LOAD_GENERATORS = 'Generators: Load';
export const SELECT_GENERATOR = 'Generator: Select';
export const LOAD_GENERATOR = 'Generator: Load';
export const RESET_GENERATOR = 'Generator: Reset';
export const PLOP_FILES = 'Generator: Plop';

const { ipcRenderer } = window.require('electron');
export function loadGenerators(project) {
	return (dispatch) => {
		ipcRenderer.send('load-generators', project);
		ipcRenderer.on('load-generators-success', (event, data) => {
			dispatch({ type: LOAD_GENERATORS, payload: data });
		});
	}
}

export function loadGenerator(project, generatorName) {
	return (dispatch) => {
		ipcRenderer.send('load-generator', { project, generatorName });
		ipcRenderer.on('load-generator-success', (event, data) => {
			dispatch({ type: LOAD_GENERATOR, payload: data });
		});
	};
}


export function resetSelectedGenerator() {
	return (dispatch) => {
		dispatch({ type: RESET_GENERATOR });		
	};
}


export function generate(project, generatorName, answers){
	return (dispatch) => {
		ipcRenderer.send('run-plop', { project, generatorName, answers });
		ipcRenderer.on('run-plop-success', (event, data) => {
			dispatch({ type: PLOP_FILES, payload: data})
		});
	}
}
export const LOAD_GENERATORS = 'Generators: Load';
export const SELECT_GENERATOR = 'Generator: Select';
export const LOAD_GENERATOR = 'Generator: Load';

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


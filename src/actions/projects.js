export const ADD_PROJECT = 'Project: Add';
export const LOAD_PROJECTS = 'Projects: Load';
export const SELECT_PROJECT = 'Project: Select';

const { ipcRenderer } = window.require('electron');
export function addProject(file) {
	return (dispatch) => {
		let payload = { folderName: extractFolderName(file.path), path: file.path };
		ipcRenderer.send('add-project', payload);
		ipcRenderer.on('add-project-success', (event, arg) => {
			dispatch({ type: ADD_PROJECT, payload });
		});
	}
}

export function loadProjects() {
	return (dispatch) => {
		ipcRenderer.send('load-projects');
		ipcRenderer.on('load-projects-success', (event, data) => {
			dispatch({ type: LOAD_PROJECTS, payload: data });
		});
	}
}

export function selectProject(project) {
	return (dispatch) => {
		dispatch({ type: SELECT_PROJECT, payload: project });
	}
}




function extractFolderName(path){
	let regex = /.*\/(.*)\/plopfile.js/;
	let found = path.match(regex);
	return found[1];
}
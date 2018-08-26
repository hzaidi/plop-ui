const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");
const {ipcMain} = require('electron');
const storage = require('electron-json-storage');
const co = require('co');
const nodePlop = require('node-plop');

let mainWindow;

require("update-electron-app")({
  repo: "kitze/react-electron-example",
  updateInterval: "1 hour"
});

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});




function set(key, data) {
	return new Promise((resolve, reject) => {
		storage.set(key, data, function(error, data) {
			if(error) {
				reject(error);
			}else {
				resolve(data);
			}
		})
	})
}
function get(key){
	return new Promise((resolve, reject) => {
		storage.get(key, function(error, data) {
			if(error) {
				reject(error);
			}else {
				resolve(data);
			}
		})
	})
}
function inspectKey(key){
	return new Promise((resolve, reject) => {
		storage.has(key, function(error, hasKey) {
			if (error) {
				reject(error);
			} else{
				resolve(hasKey);
			}
		})
	})
}


ipcMain.on('add-project', (event, arg) =>  {
	const key = 'projects';
	co(function*(){
		let hasKey = yield inspectKey(key);
		let result = [];
		if(hasKey){ result = yield get(key); }
		result.push(arg);
		yield set(key, result);
		event.sender.send('add-project-success', result);
	})
	.catch(error => event.sender.send('add-project-failure', error));;
});

ipcMain.on('load-projects', (event, arg) =>  {
	const key = 'projects';
	const dataPath = storage.getDataPath();
	console.log(dataPath);
	co(function *(){
		let hasKey = yield inspectKey(key);
		let result = hasKey ? yield get(key) : [];
		event.sender.send('load-projects-success', result);
	})
	.catch(error => event.sender.send('load-projects-failure', error));
});


ipcMain.on('load-generators', (event, arg) => {
	let project = arg;
	const plop = nodePlop(project.path);
	const generatorList = plop.getGeneratorList();
	event.sender.send('load-generators-success', generatorList);
})

ipcMain.on('load-generator', (event, arg) => {
	const { generatorName, project } = arg;
	const plop = nodePlop(project.path);
	const generator = plop.getGenerator(generatorName);
	event.sender.send('load-generator-success', generator);
})


ipcMain.on('validate-prompt', (event, arg) => {
	const { project, generatorName, promptName, value } = arg;
	const plop = nodePlop(project.path);
	const generator = plop.getGenerator(generatorName);
	const prompt = generator.prompts.find(prompt => prompt.name === promptName);
	let isValid = true;
	if(prompt.validate) {
		isValid = prompt.validate(value);
	}
	event.sender.send('validate-prompt-result', isValid);
})

ipcMain.on('default-prompt', (event, arg) => {
	co(function*(){
		const { project, generatorName, promptName } = arg;
		const plop = nodePlop(project.path);
		const generator = plop.getGenerator(generatorName);
		const prompt = generator.prompts.find(prompt => prompt.name === promptName);
		let defaultVal = null;
		if(prompt.default) {
			defaultVal = getDefaultValue(prompt.default);
		}
		event.sender.send('default-prompt-result', defaultVal);
	});
})

ipcMain.on('transform-prompt', (event, arg) => {
	co(function*(){
		const { project, generatorName, promptName } = arg;
		const plop = nodePlop(project.path);
		const generator = plop.getGenerator(generatorName);
		const prompt = generator.prompts.find(prompt => prompt.name === promptName);
		let transformedVal = null;
		if(prompt.transformer) {
			transformedVal = prompt.transformer();
		}
		event.sender.send('transform-prompt-result', transformedVal);
	});
})




ipcMain.on('run-plop', (event, arg) => {
	const { project, generatorName, answers } = arg;
	const plop = nodePlop(project.path);
	const generator = plop.getGenerator(generatorName);
	generator.runActions(answers)
			.then(result => event.sender.send('run-plop-success', result))
			.catch(error => event.sender.send('run-plop-failure', error))
})




function getDefaultValue(promptDefault){
	if(typeof promptDefault !== 'function') {
		return promptDefault;
	} else {
		return promptDefault();
	}
}
module.exports = function (plop) {
    // container component generator
    plop.setGenerator('Container Component', {
        description: 'Container Component that manage the state.',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Container name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/container-components/{{ dashCase name }}/{{ dashCase name}}.js',
            templateFile: 'plop-templates/container/container.js'
        }]
	});

	// Presentation component generator
    plop.setGenerator('Presentation Component', {
        description: 'Presentation Component that manage the display only.',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Presentation component name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/presentation-components/{{ dashCase name }}/{{ dashCase name}}.js',
            templateFile: 'plop-templates/presentation/presentation.js'
        }]
	});

	// Action functions
    plop.setGenerator('Actions', {
        description: 'Actions are responsible for CRUD operations and dispatching event.',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Action name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/actions/{{ camelCase name}}.js',
            templateFile: 'plop-templates/actions/actions.js'
        }]
	});

	// Reducers functions
    plop.setGenerator('Reducers', {
        description: 'Reducers are responsible for returning new State after computation.',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Reducer name please'
        }],
        actions: [{
            type: 'add',
            path: 'src/reducers/{{ camelCase name}}.js',
            templateFile: 'plop-templates/reducers/reducers.js'
        }]
	});
};
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

import { loadGenerator, resetSelectedGenerator, generate } from '../../actions/generators';
import Input from '../input/input'


const { ipcRenderer } = window.require('electron');
const styles = theme => ({
	container:{
		padding: 30,
		position: 'relative'
	},
	backButton:{
		position: 'absolute',
		right: 30
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	iconSmall: {
		fontSize: 20,
	}
});

class Prompts extends Component {
	childrens = [];
	
	selectComponent(prompt) {
		switch (prompt.type) {
			case 'input':
				return Input;
			default:
				break;
		}
	}

	onGenerateButtonClick() {
		const { projectsState, generatorsState, generate } = this.props;
		const { selectedProject } = projectsState;
		const { generator } = generatorsState;
		let promises = Promise.all(this.childrens.map(child => child.executeProcess()));
		promises.then(resolved => {			
			let answers = {};
			resolved.forEach(({ name, value }) => answers[name] = value);
			generate(selectedProject, generator.name, answers);
		});
	}

	goToGenratorList(){
		const { resetSelectedGenerator } = this.props;
		resetSelectedGenerator();
	}


  	render() {
		const { generatorsState, classes } = this.props;
		const { generator, outcome } = generatorsState;
		return (
			<div className={ classes.container }>
				<div>
					<Button variant="contained" onClick={ this.goToGenratorList.bind(this) } size="small" className={ [classes.button, classes.backButton].join(' ')}>
						<NavigateBefore className={[classes.leftIcon, classes.iconSmall].join(' ')} />
						Back to Generators
					</Button>
				</div>
				{
					generator &&
					<div className={ classes.promptContentContainer }>
						<div>
							<Typography align="left" variant="title" color="primary" noWrap gutterBottom={ true }>{ generator.name }</Typography>
							<Typography align="left" variant="caption" color="textSecondary" noWrap gutterBottom={ true }>{ generator.description }</Typography>
						</div>
						<div>
							{
								generator.prompts.map((prompt, index) => {
									const ComponentToRender = this.selectComponent(prompt);
									return <div className={ classes.promptItem } key={ index }><ComponentToRender {...prompt} onRef={ ref => (this.childrens.push(ref)) }/></div>
								})
							}
						</div>
						<div>
							<Button color="primary" className={classes.button} onClick={ this.onGenerateButtonClick.bind(this) }>
								Generate File
							</Button>
						</div>
					</div>
				}
				
			</div>
		);
  	}
}

const mapStateToProps = (state, props) => {
	const { generatorsState, projectsState } = state;
	return {
		projectsState,
		generatorsState
	}
}
const mapActionsToProp = {
	loadGenerator,
	resetSelectedGenerator,
	generate
}

export default compose(
	withStyles(styles, { name: 'Prompts' }),
	connect(mapStateToProps, mapActionsToProp)
)(Prompts);


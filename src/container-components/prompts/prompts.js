import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import { loadGenerator } from '../../actions/generators';
import Input from '../input/input'

const { ipcRenderer } = window.require('electron');
const styles = theme => ({
	container:{
		padding: 30
	}
});

class Prompts extends Component {
	state = {
		hashMap: new Map()
	}

	selectComponent(prompt) {
		switch (prompt.type) {
			case 'input':
				return Input;
			default:
				break;
		}
	}

	setAnswers(promptName, value){
		this.setState({
			hashMap: this.state.hashMap.set(promptName, value)
		})
	}
	onGenerateButtonClick() {
		const { projectsState, generatorsState } = this.props;
		const { selectedProject } = projectsState;
		const { generator } = generatorsState;

		let answers = {};
		for (var [key, value] of this.state.hashMap) {  answers[key] = value  };

		ipcRenderer.send('run-plop', { project: selectedProject, generatorName: generator.name, answers });
		ipcRenderer.on('run-plop-success', (event, data) => {
			console.log(data)
		});

	}



  	render() {
		const { generatorsState, classes } = this.props;
		const { generator } = generatorsState;
		return (
			<div className={ classes.container }>
				{
					generator &&
					<div>
						<Typography align="left" variant="title" color="primary" noWrap gutterBottom={ true }>{ generator.name }</Typography>
						<Typography align="left" variant="caption" color="textSecondary" noWrap gutterBottom={ true }>{ generator.description }</Typography>
						{
							generator.prompts.map((prompt, index) => {
								const ComponentToRender = this.selectComponent(prompt);
								return <div className={ classes.promptItem } key={ index }><ComponentToRender {...prompt} setAnswers={ this.setAnswers.bind(this) }/></div>
							})
						}
						<Button color="primary" className={classes.button} onClick={ this.onGenerateButtonClick.bind(this) }>
							Generate File
						</Button>
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
	loadGenerator
}

export default compose(
	withStyles(styles, { name: 'Prompts' }),
	connect(mapStateToProps, mapActionsToProp)
)(Prompts);


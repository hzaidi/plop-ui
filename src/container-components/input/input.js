import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const { ipcRenderer } = window.require('electron');
const styles = theme => ({

});

class Input extends Component {
	state = {
		value: '',
		hasErrors: false,
		errorMessage: ''
	}

	// componentDidMount(){
	// 	const { projectsState, generatorsState, name } = this.props;
	// 	const { selectedProject } = projectsState;
	// 	const { generator } = generatorsState;
	// 	ipcRenderer.send('default-prompt', { project: selectedProject, generatorName: generator.name, promptName: name });
	// 	ipcRenderer.on('default-prompt-result', (event, data) => {
	// 		console.log(data)
	// 	});
	// }

	componentDidUpdate(){
		console.log('component is updated')
	}


	executeProcess(value) {
		const { name, setAnswers } = this.props;
		this.setState({ value });
		setAnswers(name, value);
	}

	onTextChange(event){
		let value = event.target.value;
		this.executeProcess(value);
	}

	onKeyPress(event){
		if(event.key === 'Enter') {
			let value = event.target.value;
			this.executeProcess(value);
		}
	}
	onBlur(event){
		const { projectsState, generatorsState, name } = this.props;
		const { selectedProject } = projectsState;
		const { generator } = generatorsState;
		const value = event.target.value;
		ipcRenderer.send('validate-prompt', { project: selectedProject, generatorName: generator.name, promptName: name, value });
		ipcRenderer.on('validate-prompt-result', (event, data) => {
			const hasErrors = typeof(data) !== "boolean";
			this.setState({ hasErrors, errorMessage: hasErrors ? data : '' })
		});
	}

	render(){
		const { classes, message, name } = this.props;
		return (
			<div className={ classes.container }>
				<TextField
					error= { this.state.hasErrors }
					fullWidth={ true }
					id={ message + name }
					label={ message }
					placeholder={ name }
					onKeyPress={ this.onKeyPress.bind(this) }
					onBlur= { this.onBlur.bind(this) }
					onChange={ this.onTextChange.bind(this) }
					className={classes.textField}
					helperText={ this.state.errorMessage }
					margin="normal"
				/>
			</div>
		)
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

}

export default compose(
	withStyles(styles, { name: 'Input' }),
	connect(mapStateToProps, mapActionsToProp)
)(Input);


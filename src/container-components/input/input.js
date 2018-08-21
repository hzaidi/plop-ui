import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const { ipcRenderer } = window.require('electron');
const styles = theme => ({
	container:{
		marginTop: 30
	}
});

class Input extends Component {
	state = {
		value: '',
		hasErrors: false,
		errorMessage: '',
		transformedValue: null,
		defaultValue: null
	}

	componentDidMount(){
		this.props.onRef(this);
		this.transformer();
		this.default();
	}
	componentWillUnmount(){
		ipcRenderer.removeListener('validate-prompt-result', this._handleValidateResult.bind(this));
		ipcRenderer.removeListener('default-prompt-result', this._handleDefaultResult.bind(this));
		ipcRenderer.removeListener('transform-prompt-result', this._handleTransformResult.bind(this));
		this.props.onRef(null);
	}
	
	
	executeProcess() {
		const { name } = this.props;
		const resolvedValue = this.state.value || this.state.defaultValue;
		return new Promise((resolve, reject) => {
			this.validate(resolvedValue, () => {
				let hasErrors = this.state.hasErrors;
				if(!hasErrors) {
					resolve({ name, value: resolvedValue });
				}
			});		
		});
		
		// const { name, onGenerateClick } = this.props;
		// this.setState({ value });
		// setAnswers(name, value);
	}

	onTextChange(event){
		let value = event.target.value;
		this.setState({ value });
	}

	onBlur(event){
		const value = event.target.value;
		this.validate(value);		
	}

	validate(value, cb = () => {}){
		const { projectsState, generatorsState, name } = this.props;
		const { selectedProject } = projectsState;
		const { generator } = generatorsState;	
		if(value){	
			ipcRenderer.send('validate-prompt', { project: selectedProject, generatorName: generator.name, promptName: name, value });
			ipcRenderer.on('validate-prompt-result', (event, data) => { this._handleValidateResult(event, data, cb) });
		}
	}
	_handleValidateResult(event, data, cb = () => {}){
		const hasErrors = typeof(data) !== "boolean";
		this.setState({ hasErrors, errorMessage: hasErrors ? data : '' }, cb);
	}


	default(){
		const { projectsState, generatorsState, name } = this.props;
		const { selectedProject } = projectsState;
		const { generator } = generatorsState;		
		ipcRenderer.send('default-prompt', { project: selectedProject, generatorName: generator.name, promptName: name });
		ipcRenderer.on('default-prompt-result', this._handleDefaultResult.bind(this));
	}
	_handleDefaultResult(event, data){
		this.setState({ defaultValue: data });
	}

	transformer(){
		const { projectsState, generatorsState, name } = this.props;
		const { selectedProject } = projectsState;
		const { generator } = generatorsState;		
		ipcRenderer.send('transform-prompt', { project: selectedProject, generatorName: generator.name, promptName: name });
		ipcRenderer.on('transform-prompt-result', this._handleTransformResult.bind(this));
	}
	_handleTransformResult(event,data){
		this.setState({ transformedValue: data });
	}


	render(){
		const { classes, message, name } = this.props;
		return (
			<div className={ classes.container }>
				{
					this.state.defaultValue && 
					<div>
						<Typography variant="subheading" component="span" color="default" noWrap>
							Default Value: { this.state.defaultValue }
						</Typography>					
					</div>
				}
				{
					this.state.transformedValue && 
					<div>
						<Typography variant="subheading" color="default" noWrap>
							Transformed Value: { this.state.transformedValue }
						</Typography>					
					</div>
				}
				<TextField
					error= { this.state.hasErrors }
					fullWidth={ true }
					id={ message + name }
					label={ message }
					placeholder={ name }
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


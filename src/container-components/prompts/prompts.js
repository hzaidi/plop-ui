import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import { loadGenerator, resetSelectedGenerator, generate } from '../../actions/generators';
import Input from '../input/input';
import Confirm from '../confirm/confirm';


const styles = theme => ({
	container:{
		padding: 30
	},
	promptItem:{
		backgroundColor: '#e2e2e2',
		padding: 20,
		margin: '10px 0',
		borderRadius: 5,
		border: '1px solid #c3c3c3'
	}
});

class Prompts extends Component {
	childrens = [];
	
	selectComponent(prompt) {
		switch (prompt.type) {
			case 'input':
				return Input;
			case 'confirm':
				return Confirm;
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
			//console.log(answers)
			generate(selectedProject, generator.name, answers);
		});
	}

  	render() {
		const { generatorsState, classes } = this.props;
		const { generator } = generatorsState;
		return (
			<div className={ classes.container }>
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
							<Button  variant="contained" color="primary" className={classes.button} onClick={ this.onGenerateButtonClick.bind(this) }>
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


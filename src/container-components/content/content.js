import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';

import { loadGenerators, loadGenerator, resetSelectedGenerator } from '../../actions/generators';
import ProjectHeader from '../../presentation-components/project-header/project-header';
import GeneratorList from '../../presentation-components/generator-list/generator-list';
import Prompts from '../../container-components/prompts/prompts';
import Outcome from '../../presentation-components/outcome/outcome';

const styles = theme => ({
	// container:{
	// 	position: 'relative'
	// },
	backButton:{
		textAlign: 'right',
		padding: 10,
		lineHeight: 3
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

class Content extends Component {
	componentDidMount(){
		const { projectsState, loadGenerators } = this.props;
		loadGenerators(projectsState.selectedProject);
	}
	onGeneratorClick(name) {
		const { loadGenerator, projectsState } = this.props;
		const { selectedProject } = projectsState;		
		loadGenerator(selectedProject, name);
	}

	goToGenratorList(){
		const { resetSelectedGenerator } = this.props;
		resetSelectedGenerator();
	}


  	render() {		
		const { projectsState, generatorsState, classes } = this.props;
		const { selectedProject } = projectsState;
		const { generators, generator, outcome } = generatorsState;
		return (
			<div className={ classes.container }>				
				<ProjectHeader project={ selectedProject }/>
				{ !outcome && !generator && generators && <GeneratorList generators={ generators } onGeneratorClick={ this.onGeneratorClick.bind(this) }/> }
				{
					generator &&
					<div className={ classes.backButton }>
						<Button variant="contained" onClick={ this.goToGenratorList.bind(this) } size="small">
							<NavigateBefore className={[classes.leftIcon, classes.iconSmall].join(' ')} />
							Back to Generators
						</Button>
					</div>
				}
				{ generator && <Prompts /> }
				{ outcome && <Outcome outcome={ outcome }/> }
			</div>
		);
  	}
}

const mapStateToProps = (state, props) => {
	const { projectsState, generatorsState } = state;
	return {
		projectsState,
		generatorsState
	}
}
const mapActionsToProp = {
	loadGenerators,
	loadGenerator,
	resetSelectedGenerator
}

export default compose(
	withStyles(styles, { name: 'Content' }),
	connect(mapStateToProps, mapActionsToProp)
)(Content);


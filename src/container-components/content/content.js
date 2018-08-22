import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { loadGenerators, loadGenerator } from '../../actions/generators';
import ProjectHeader from '../../presentation-components/project-header/project-header';
import GeneratorList from '../../presentation-components/generator-list/generator-list';
import Prompts from '../../container-components/prompts/prompts';
import Outcome from '../../presentation-components/outcome/outcome';

const styles = theme => ({

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

  	render() {		
		const { projectsState, generatorsState } = this.props;
		const { selectedProject } = projectsState;
		const { generators, generator, outcome } = generatorsState;
		return (
			<div>
				<ProjectHeader project={ selectedProject }/>
				{ ! outcome && !generator && generators && <GeneratorList generators={ generators } onGeneratorClick={ this.onGeneratorClick.bind(this) }/> }
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
	loadGenerator
}

export default compose(
	withStyles(styles, { name: 'Content' }),
	connect(mapStateToProps, mapActionsToProp)
)(Content);


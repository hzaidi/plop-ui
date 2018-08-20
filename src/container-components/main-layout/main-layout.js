import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { addProject, loadProjects, selectProject } from '../../actions/projects';
import { resetSelectedGenerator } from '../../actions/generators';
import Banner from '../../presentation-components/banner/banner';
import SideBar from '../../presentation-components/side-bar/side-bar';
import Content from '../../container-components/content/content';


const styles = theme => ({
	root: {
		flexGrow: 1,
		height: '100vh',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		minWidth: 0, // So the Typography noWrap works
	},
	toolbar: theme.mixins.toolbar
});

class MainLayout extends Component {

	componentDidMount(){
		const { loadProjects } = this.props;
		loadProjects();
	}

	onAddProject(event){
		const { addProject } = this.props;
		addProject(event.target.files[0]);
	}

	selectProject(project){
		const { selectProject, resetSelectedGenerator } = this.props;
		resetSelectedGenerator();
		selectProject(project);
	}

  	render() {
		const { classes, projectsState } = this.props;
		const { projects, selectedProject } = projectsState;
		return (
			<div className={classes.root}>
				<Banner />
				<SideBar projects={ projects } onSelectProject={ this.selectProject.bind(this) } onAddProject={ this.onAddProject.bind(this) }/>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					{ selectedProject && <Content /> }
				</main>
		  	</div>
		);
  	}
}

const mapStateToProps = (state, props) => {
	const { projectsState } = state;
	return {
		projectsState
	}
}
const mapActionsToProp = {
	addProject,
	loadProjects,
	selectProject,
	resetSelectedGenerator
}

export default compose(
	withStyles(styles, { name: 'MainLayout' }),
	connect(mapStateToProps, mapActionsToProp)
)(MainLayout);


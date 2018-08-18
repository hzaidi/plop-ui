import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import AddProject from '../add-project/add-project'


const drawerWidth = 240;
const styles = theme => ({
	drawerPaper: {
		position: 'relative',
		width: drawerWidth,
	},
	noProjects:{
		padding: '20px 15px 0 15px',
		lineHeight: 2
	},
	toolbar: theme.mixins.toolbar
});


const SideBar = (props) => {
	const { classes, onAddProject, onSelectProject, projects } = props;
	return (
		<div className={ classes.container }>
			<Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
				<div className={classes.toolbar} />
				{
					projects.length === 0 &&
					<div className={ classes.noProjects }>
						<Typography variant="button" color="default" noWrap>
							No project added...
						</Typography>
					</div>
				}
				<List>
					{
						projects.map((project, index) => {
							return <ListItem key={index} button onClick={ () => onSelectProject(project) }>
								<ListItemText primary={ project.folderName } />
							</ListItem>
						})
					}
				</List>
				<AddProject onAddProject={ onAddProject } />
			</Drawer>
		</div>
	)
}


SideBar.propTypes = {
	classes: PropTypes.object.isRequired,
	projects: PropTypes.array.isRequired,
	onAddProject: PropTypes.func.isRequired,
	onSelectProject: PropTypes.func.isRequired
};

export default withStyles(styles)(SideBar);
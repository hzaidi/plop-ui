import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	container: {
		backgroundColor: '#e2e2e2',
		padding: 20
	}
});


const ProjectHeader = (props) => {
	const { classes, project } = props;
	return (
		<div className={ classes.container }>
			<Typography variant="headline" color="primary" noWrap>
				{ project.folderName }
			</Typography>
			<Typography variant="title" color="inherit" noWrap>
				{ project.path }
			</Typography>
		</div>
	)
}


ProjectHeader.propTypes = {
	classes: PropTypes.object.isRequired,
	project: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectHeader);
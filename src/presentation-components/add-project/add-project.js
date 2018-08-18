import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	input: {
		display: 'none',
	},
	button: {
		margin: theme.spacing.unit,
		boxSizing: 'border-box'
	}
});


const AddProject = (props) => {
	const { classes, onAddProject } = props;
	return (
		<div className={ classes.container }>
			<input
				className={classes.input}
				id="contained-button-file"
				multiple
				type="file"
				onChange={ (event) => onAddProject(event) }
			/>

			 <label htmlFor="contained-button-file">
				<Button variant="outlined" component="span" color="secondary" className={classes.button}>
					Add Project
				</Button>
			</label>
		</div>
	)
}


AddProject.propTypes = {
	classes: PropTypes.object.isRequired,
	onAddProject: PropTypes.func.isRequired
};

export default withStyles(styles)(AddProject);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	container: {

	}
});


const {{ properCase name }} = (props) => {
	const { classes } = props;
	return (
		<div className={ classes.container }>
			This is {{ properCase name }} presentation component
		</div>
	)
}


{{ properCase name }}.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)({{ properCase name }});
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	container: {

	}
});


const PromptMessage = (props) => {
	const { classes, message } = props;
	return (
		<div className={ classes.container }>
			<Typography variant="title" color="primary" noWrap>
				{ message }
			</Typography>								
		</div>
	)
}


PromptMessage.propTypes = {
	classes: PropTypes.object.isRequired,
	message: PropTypes.string
};

export default withStyles(styles)(PromptMessage);
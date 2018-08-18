import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	}
});


const Banner = (props) => {
	const { classes } = props;
	return (
		<div className={ classes.container }>
			<AppBar position="absolute" className={classes.appBar}>
				<Toolbar>
					<Typography variant="title" color="inherit" noWrap>
						Plop UI
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}


Banner.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Banner);
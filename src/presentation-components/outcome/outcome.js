import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	container: {
		backgroundColor: '#000',
		color: '#fff',
		padding: 10,
		margin:10,
		borderRadius: 4
	},
	success:{
		color: 'rgba(2, 255, 0, 0.87)'
	}
});


const Outcome = (props) => {
	const { classes, outcome } = props;
	debugger;
	return (
		<div className={ classes.container }>			
			<Typography className={ classes.success } variant="title" noWrap>
				SUCCESS!!
			</Typography>
			{
				outcome.changes && 
				outcome.changes.map((change, index) => {
					return <Typography key={index} variant="title" color="inherit" noWrap>
								{ change.path } { change.type }
							</Typography>
				})
			}

			<Typography className={ classes.success } variant="title" noWrap>
				FAILURE!!
			</Typography>
			{
				outcome.failures && 
				outcome.failures.map((change, index) => {
					return <Typography key={index} variant="title" color="inherit" noWrap>
								{ change.path } { change.type }
							</Typography>
				})
			}
			
		</div>
	)
}


Outcome.propTypes = {
	classes: PropTypes.object.isRequired,
	outcome: PropTypes.object.isRequired
};

export default withStyles(styles)(Outcome);
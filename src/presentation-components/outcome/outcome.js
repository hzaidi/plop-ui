import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	container: {
		backgroundColor: '#000',
		color: '#fff',
		padding: '20px 10px',
		margin: 10,
		borderRadius: 4
	},
	success:{
		color: 'rgba(2, 255, 0, 0.87)',
		marginBottom: 20
	},
	failure:{
		color: 'rgba(255, 0, 0, 0.87)',
		marginBottom: 20
	},
	type:{
		color: 'rgba(171, 171, 171, 0.87)',
		textTransform: 'capitalize',
		marginRight: 20
	}
});


const Outcome = (props) => {
	const { classes, outcome } = props;
	return (
		<div className={ classes.container }>							
			<div>
				{
					outcome.changes.length > 0 &&
					<Typography className={ classes.success } variant="title" noWrap>
						SUCCESS!!
					</Typography>
				}
				{					 
					outcome.changes.map((change, index) => {
						return <Typography key={index} variant="title" color="inherit" noWrap>
									<span className={ classes.type }>{ change.type }</span>								
									{ change.path }
								</Typography>
					})
				}					
			</div>			
			
			<div>
				{
					outcome.failures.length > 0 && 
					<Typography className={ classes.failure } variant="title" noWrap>
						FAILURE!!
					</Typography>
				}
				{				
					outcome.failures.map((change, index) => {
						return <Typography key={index} variant="title" color="inherit" noWrap>
									<span className={ classes.type }>{ change.type }</span>								
									{ change.error || change.message }
								</Typography>
					})
				}
			</div>
		</div>
	)
}


Outcome.propTypes = {
	classes: PropTypes.object.isRequired,
	outcome: PropTypes.object.isRequired
};

export default withStyles(styles)(Outcome);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';


const styles = theme => ({
	container: {
		backgroundColor: '#f1f1f1'
	}
});


const GeneratorList = (props) => {
	const { classes, generators, onGeneratorClick } = props;
	return (
		<div className={ classes.container }>
			{
				generators.map((generator, index) => {
					return <Tooltip key={ index } title={ generator.description }>
								<Button color="primary" onClick={ () => onGeneratorClick(generator.name) }>
									{ generator.name }
								</Button>
							</Tooltip>
					})
			}
		</div>
	)
}


GeneratorList.propTypes = {
	classes: PropTypes.object.isRequired,
	generators: PropTypes.array.isRequired,
	onGeneratorClick: PropTypes.func.isRequired
};

export default withStyles(styles)(GeneratorList);
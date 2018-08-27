import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

import PromptMessage from '../../presentation-components/prompt-message/prompt-message';

const styles = theme => ({
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 150,
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	}
});

class Confirm extends Component {
	state = {
		confirmValue: '',
		defaultValue: '-1',
		hasErrors: false
	};

	componentDidMount(){
		this.props.onRef(this);
	}

	componentWillMount(){	
		const defaultValue = this.props.default;
		if(defaultValue !== undefined){
			this.setState({ defaultValue });
		}
	}

	componentWillUnmount(){
		this.props.onRef(null);
	}

	validate(value, cb = () => {}){
		this.setState({ hasErrors: (value === '-1') }, cb)
	}
	
	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	executeProcess() {		
		const { name } = this.props;
		const resolvedValue = this.state.confirmValue !== '-1' ? this.state.confirmValue === 'Yes' : this.state.defaultValue;		
		return new Promise((resolve, reject) => {
			this.validate(resolvedValue, () => {
				let hasErrors = this.state.hasErrors;
				if(!hasErrors) {
					resolve({ name, value: resolvedValue });
				}
			});
		});		
	}	
  	render() {
		const { message, classes }= this.props;
		return (			
			<div>
				{
					this.state.defaultValue !== null && 
					<div>
						<Typography variant="subheading" component="span" color="default" noWrap>
							Default Value: { this.state.defaultValue ? 'Yes' : 'No' }
						</Typography>					
					</div>
				}
				<PromptMessage message={ message } />
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="confirm-value-simple">Select option</InputLabel>
					<Select
						error={ this.state.hasErrors }
						value={this.state.confirmValue}
						onChange={this.handleChange}
						inputProps={{
						name: 'confirmValue',
						id: 'confirm-value-simple',
						}}
					>
						<MenuItem value="-1">
							<em>None</em>
						</MenuItem>
						<MenuItem value="Yes">Yes</MenuItem>
						<MenuItem value="No">No</MenuItem>						
					</Select>
					<FormHelperText>It is required</FormHelperText>
				</FormControl>
			</div>
		);
  	}
}

const mapStateToProps = (state, props) => {
	return {

	}
}
const mapActionsToProp = {

}

export default compose(
	withStyles(styles, { name: 'Confirm' }),
	connect(mapStateToProps, mapActionsToProp)
)(Confirm);


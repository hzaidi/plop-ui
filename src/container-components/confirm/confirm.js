import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const styles = theme => ({

});

class Confirm extends Component {
	state = {
		checkedA: true,
		checkedB: true,
		defaultValue: null
	};

	componentWillMount(){	
		const defaultValue = this.props.default;
		if(defaultValue !== undefined){
			this.setState({ defaultValue });
		}
	}
	
	handleChange = name => event => {
		this.setState({ [name]: event.target.checked });
	};
	executeProcess() {

	}	
  	render() {
		const { message }= this.props;
		debugger;
		return (			
			<div>
				{
					this.state.defaultValue && 
					<div>
						<Typography variant="subheading" component="span" color="default" noWrap>
							Default Value: { this.state.defaultValue }
						</Typography>					
					</div>
				}
				{
					<div>
						<Typography variant="subheading" color="default" noWrap>
							{ message }
						</Typography>					
					</div>
				}
				<FormControlLabel
					control={
						<Switch
							checked={this.state.checkedB}
							onChange={this.handleChange('checkedB')}
							value="checkedB"
							color="primary"
						/>
					}
				label="Primary"
				/>
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


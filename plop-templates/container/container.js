import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class {{ properCase name }} extends Component {
  	render() {
		return (
			<div>
				This is a {{ properCase name }} Container Component
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
	withStyles(styles, { name: '{{ properCase name }}' }),
	connect(mapStateToProps, mapActionsToProp)
)({{ properCase name }});


import React, { Component }from "react";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainLayout from './container-components/main-layout/main-layout';


const theme = createMuiTheme({
	palette: {
		primary: {
		  main: '#044d59',
		},
		secondary: {
		  main: '#26a69a',
		},
	},
	typography: {
		fontFamily: 'Ropa Sans'
	},
});

const styles = theme => ({

});


class App extends Component {
	render(){
		return (
			<Router>
				<MuiThemeProvider theme={theme}>
					<Route exact path="/" component={MainLayout}/>
				</MuiThemeProvider>
			</Router>
		);
	}

}

const mapStateToProps = (state, props) => {
	return {}
}
const mapActionsToProp = {}

export default compose(
	withStyles(styles, { name: 'App' }),
	connect(mapStateToProps, mapActionsToProp)
)(App);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import 'babel-polyfill';

class Root extends Component {
	render() {
		const { error } = this.props;
		const footer = `${process.env.REACT_APP_NAME} - ${
			process.env.REACT_APP_VERSION
		}`;
		return (
			<div>
				<Router>
					<Routes error={error} />
				</Router>
				<footer className="centered" style={{ marginTop: '50px' }}>
					<p>{footer}</p>
				</footer>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const error = state.app.error;
	return { error };
};

export default connect(mapStateToProps)(Root);

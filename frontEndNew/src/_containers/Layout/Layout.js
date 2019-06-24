import React, { Component } from 'react';

import './Layout.css';
import Navbar from '../../_components/Navigation/Navbar/Navbar';
import ProjectNavbar from '../../_components/Navigation/ProjectNavbar/ProjectNavbar';
class Layout extends Component {
	render() {
		const { history } = this.props;
		console.log('match', history);
		const url = history.location.pathname;
		if (url.includes('login')) {
			return (
				<React.Fragment>
					<main>{this.props.children}</main>
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				{url.includes('project') ? (
					<ProjectNavbar history={history} />
				) : (
					<Navbar history={history} />
				)}
				<main>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

export default Layout;

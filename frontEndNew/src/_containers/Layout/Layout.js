import React, { Component } from 'react';

import './Layout.css';
import Navbar from '../../_components/Navigation/Navbar/Navbar';
import { ProjectNavbar } from '../../_components/Navigation/ProjectNavbar/ProjectNavbar';
class Layout extends Component {
	render() {
		const { history } = this.props;
		let url = history.location.pathname;
		// history.listen(location => {
		// 	url = location.pathname;
		// });
		console.log(history);
		if (url.includes('login')) {
			return (
				<React.Fragment>
					<main>{this.props.children}</main>
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				{url.includes('projects') ||
				url.includes('dashboard') ||
				url.includes('datasets') ? (
					<ProjectNavbar url={url} />
				) : (
					<Navbar history={history} />
				)}
				<main>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

export default Layout;

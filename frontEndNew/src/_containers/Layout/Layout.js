import React, { Component } from 'react';

import './Layout.css';
import Navbar from '../../_components/Navigation/Navbar/Navbar';

class Layout extends Component {
	render() {
		return (
			<React.Fragment>
				<Navbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<main className={'Content'}>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

export default Layout;

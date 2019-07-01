import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './AdminPage.css';

import { BoxFactory } from '../../_components/BoxFactory/BoxFactory';
import { BoxHospital } from '../../_components/BoxHospital/BoxHospital';

class AdminPage extends React.Component {
	state = {
		selectedTab: 0,
	};

	handleTabsChange = (event, newValue) => {
		this.setState({ selectedTab: newValue });
	};

	render() {
		const { selectedTab } = this.state;
		return (
			<React.Fragment>
				<Paper>
					<Tabs
						value={selectedTab}
						onChange={this.handleTabsChange}
						indicatorColor='primary'
						textColor='primary'
						centered>
						<Tab label='Box Factory' />
						<Tab label='Box Hospital' />
						<Tab label='Item Three' />
					</Tabs>
				</Paper>
				{selectedTab === 0 ? <BoxFactory /> : null}
				{selectedTab === 1 ? <BoxHospital /> : null}
				{selectedTab === 2 ? <div>Nothing Yet</div> : null}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { users, authentication } = state;
	const { user } = authentication;
	return {
		user,
		users,
	};
}

const connectedAdminPage = connect(mapStateToProps)(AdminPage);
export { connectedAdminPage as AdminPage };

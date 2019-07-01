import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './AdminPage.css';

import { projectActions } from '../../_actions';

import { BoxFactory } from '../../_components/BoxFactory/BoxFactory';
import { BoxHospital } from '../../_components/BoxHospital/BoxHospital';

class AdminPage extends React.Component {
	state = {
		selectedTab: 0,
	};

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch(projectActions.getAllActors());
	}

	handleTabsChange = (event, newValue) => {
		this.setState({ selectedTab: newValue });
	};

	render() {
		const { selectedTab } = this.state;
		const { actorsList, actorsTree } = this.props;
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
				{selectedTab === 1 ? (
					<BoxHospital actorsList={actorsList} actorsTree={actorsTree} />
				) : null}
				{selectedTab === 2 ? <div>Make Box public</div> : null}
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { users, authentication } = state;
	const { actorsList, actorsTree } = state.project;
	const { user } = authentication;
	return {
		user,
		users,
		actorsList,
		actorsTree,
	};
}

const connectedAdminPage = connect(mapStateToProps)(AdminPage);
export { connectedAdminPage as AdminPage };

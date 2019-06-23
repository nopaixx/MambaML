import React from 'react';

import { DragDropState } from './DragDropState';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions';
import { Button } from '../Utils/Button/Button';
import { Input } from '../Utils/Input/Input';
import './DesignComponent.css';

//import html2canvas from 'html2canvas';

class DesignComponent extends React.Component {
	state = {
		projectName: undefined,
	};
	componentDidMount() {
		const { dispatch, project, match } = this.props;
		dispatch(projectActions.getAllActors());
		if (!project) {
			const ID = match.params.id;
			dispatch(projectActions.get(ID));
		}
	}

	onClickLogo = () => {
		const { history } = this.props;
		history.push(`/`);
	};

	onSaveProject = () => {
		const { dispatch, project, match, chartStructure } = this.props;
		const ID = match.params.id;
		const { projectName } = this.state;
		dispatch(
			projectActions.save(
				ID,
				projectName || 'casae',
				chartStructure,
				'V1',
				'V1'
			)
		);
	};

	onChangeName = e => {
		this.setState({ projectName: e.target.value });
	};

	render() {
		const { actors, project } = this.props;
		const { projectName } = this.state;

		if (!project) {
			return null;
		}
		if (project) {
			return (
				<React.Fragment>
					<nav style={{ backgroundColor: 'green' }}>
						<Input onChange={this.onChangeName} value={projectName || ''} />
						<Button label={'darkMode'} />
						<Button onClick={this.onSaveProject} label={'save'} />
					</nav>
					<div className={'design-window'}>
						<DragDropState
							onSaveProject={this.onSaveProject}
							actors={actors}
							updateBoxInfo={this.onSaveProject}
							project={project}
							dispatch={this.props.dispatch}
						/>
					</div>
				</React.Fragment>
			);
		} else {
			return null;
		}
	}
}

function mapStateToProps(state) {
	const {
		project,
		gettingProject,
		actors,
		creatingProject,
		chartStructure,
	} = state.project;
	return {
		project,
		gettingProject,
		creatingProject,
		actors,
		chartStructure,
	};
}

const connectedDesignComponent = connect(mapStateToProps)(DesignComponent);
export { connectedDesignComponent as DesignComponent };

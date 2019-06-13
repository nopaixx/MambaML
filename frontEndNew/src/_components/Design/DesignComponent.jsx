import React from 'react';

import { DragDropState } from './DragDropState';
import './DesignComponent.css';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions';
import { Button } from '../Utils/Button/Button';
import { Input } from '../Utils/Input/Input';

import html2canvas from 'html2canvas';

class DesignComponent extends React.Component {
	state = {
		open: undefined,
		projectName: undefined,
		chart: undefined,
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

	onSaveProject = chart => {
		const { dispatch, project } = this.props;
		const { projectName } = this.state;
		console.log('chart', chart);
		dispatch(projectActions.save(1, 'casae', chart, 'V1', 'V1'));
	};

	onChangeName = e => {
		this.setState({ projectName: e.target.value });
	};

	// screenShot = () => {
	// 	html2canvas(document.querySelector('#flowchartCanvas')).then(canvas =>
	// 		console.log(canvas.toDataURL())
	// 	);
	// };

	render() {
		const { actors } = this.props;
		const { projectName } = this.state;
		return (
			<React.Fragment>
				<nav>
					<Button label={'screenshot'} onClick={this.screenShot} />
					<Input onChange={this.onChangeName} value={projectName || ''} />
					<Button label={'darkMode'} />
				</nav>
				<div className={'design-window'}>
					<DragDropState
						onSaveProject={this.onSaveProject}
						actors={actors}
						updateBoxInfo={this.onSaveProject}
					/>
				</div>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { project, gettingProject, actors, creatingProject } = state.project;
	console.log(actors);
	return {
		project,
		gettingProject,
		creatingProject,
		actors,
	};
}

const connectedDesignComponent = connect(mapStateToProps)(DesignComponent);
export { connectedDesignComponent as DesignComponent };

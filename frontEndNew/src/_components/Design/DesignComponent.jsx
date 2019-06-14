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
		dispatch(projectActions.save(1, projectName || 'casae', chart, 'V1', 'V1'));
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
		const { actors, project } = this.props;
		const { projectName } = this.state;

		if (!project) {
			return null;
		}
		if (project) {
			console.log('before render', project);
			console.log('we render');
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
							project={project}
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
	const { project, gettingProject, actors, creatingProject } = state.project;
	return {
		project,
		gettingProject,
		creatingProject,
		actors,
	};
}

const connectedDesignComponent = connect(mapStateToProps)(DesignComponent);
export { connectedDesignComponent as DesignComponent };

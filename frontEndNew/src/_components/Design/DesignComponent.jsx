import React from 'react';

import { DragDropState } from './DragDropState';
import { connect } from 'react-redux';
import { projectActions } from '../../_actions';
import { Button } from '../Utils/Button/Button';
import { Input } from '../Utils/Input/Input';

import './DesignComponent.css';

//import html2canvas from 'html2canvas';

const actors2 = [
	{
		type: 'Python Script',
		name: 'Tratamiento de Datos-Manipulacion Filas-Split',
		ports: {
			port1: {
				id: 'port1',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port2: {
				id: 'port2',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port3: {
				id: 'port3',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port4: {
				id: 'port4',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port5: {
				id: 'port5',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port6: {
				id: 'port6',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port7: {
				id: 'port7',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port8: {
				id: 'port8',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port9: {
				id: 'port9',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port10: {
				id: 'port10',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
		},
		properties: {
			payload: {
				python_code:
					'def %ID(input_1=None, input_2=None, input_3=None, input_4=None, input_5=None):\n    output_1 = None\n    output_2 = None\n    output_3 = None\n    output_4 = None\n    output_5 = None\n    return output_1, output_2, output_3, output_4, output_5\n                ',
				depen_code: '',
				n_input_ports: 5,
				n_output_ports: 5,
				frontendVersion: 'V1',
				backendVersion: 'V1',
			},
		},
	},
	{
		type: 'Python Script',
		name: 'Python Module-Python Script',
		ports: {
			port1: {
				id: 'port1',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port2: {
				id: 'port2',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port3: {
				id: 'port3',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
		},
		properties: {
			payload: {
				python_code:
					'def %ID(input1=None):\n    left, right = train_test_split(\n    input1, test_size=:PARAM1, random_state=:PARAM2)\n    return left, right\n                ',
				depen_code:
					'import numpy as np\nfrom sklearn.model_selection import train_test_split\n                ',
				n_input_ports: 1,
				n_output_ports: 2,
				frontendVersion: 'V1',
				backendVersion: 'V1',
			},
		},
	},
];

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
		const { dispatch, project, match } = this.props;
		const ID = match.params.id;
		const { projectName } = this.state;
		dispatch(
			projectActions.save(ID, projectName || 'casae', chart, 'V1', 'V1')
		);
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
			return (
				<React.Fragment>
					<nav>
						{/* <Button label={'screenshot'} onClick={this.screenShot} /> */}
						<Input onChange={this.onChangeName} value={projectName || ''} />
						{/* <Button label={'darkMode'} /> */}
					</nav>
					<div className={'design-window'}>
						<DragDropState
							onSaveProject={this.onSaveProject}
							//actors={actors}
							actors={actors2}
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

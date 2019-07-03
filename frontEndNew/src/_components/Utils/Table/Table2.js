import React from 'react';
import MaterialTable from 'material-table';
import './Table.css';

export default class ParametersTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: 'Name',
					field: 'name',
				},
				{ title: 'Param Firendly', field: 'param_friend_name' },
				{
					title: 'Param Type',
					field: 'type',
					editComponent: props => (
						<select
							name='type'
							onChange={e => this.onParamTypeChange(e, props)}>
							<option value='String'>String</option>
							<option value='int'>int</option>
							<option value='float'>float</option>
							<option value='list'>list</option>
							<option value='csv'>CSV-selector</option>
						</select>
					),
				},
				{ title: 'Value', field: 'value' },
				{ title: 'Param Help', field: 'param_help' },
				{ title: 'Param Url', field: 'param_url' },
				{ title: 'Param Rec', field: 'param_rec' },
			],
			data: [],
		};
	}
	onParamTypeChange = (e, props) => {
		const { value } = e.target;
		const { specialParamSelector } = this.props;
		if (value === 'csv') {
			specialParamSelector(value);
			this.setState({ savedProps: props });
		}
		props.onChange(value);
	};

	componentDidMount() {
		const { data } = this.props;
		if (data) {
			this.setState({ data: data });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const { data, dataset } = this.props;
		const { savedProps } = this.state;
		if (prevState.data !== this.props.data) {
			this.setState({ data: data });
		}
		if (prevProps.dataset !== dataset) {
			const newProps = { ...savedProps.rowData, type: 'csv', value: dataset };
			savedProps.onRowDataChange(newProps);
		}
	}

	addRow = newData => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				{
					const data = this.state.data || [];
					data.push(newData);
					this.props.updateBoxState(data);
					this.setState({ data }, () => resolve());
				}
				resolve();
			}, 100);
		});
	};

	updateRowData = (newData, oldData) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				{
					const data = this.state.data || [];
					const index = data.indexOf(oldData);
					data[index] = newData;
					this.props.updateBoxState(data);
					this.setState({ data }, () => resolve());
				}
				resolve();
			}, 100);
		});
	};

	deleteRowData = oldData => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				{
					let data = this.state.data;
					const index = data.indexOf(oldData);
					data.splice(index, 1);
					this.props.updateBoxState(data);
					this.setState({ data }, () => resolve());
				}
				resolve();
			}, 100);
		});
	};

	render() {
		return (
			<MaterialTable
				title='Params Table'
				columns={this.state.columns}
				data={this.state.data}
				editable={{
					onRowAdd: newData => this.addRow(newData),
					onRowUpdate: (newData, oldData) =>
						this.updateRowData(newData, oldData),
					onRowDelete: oldData => this.deleteRowData(oldData),
				}}
			/>
		);
	}
}

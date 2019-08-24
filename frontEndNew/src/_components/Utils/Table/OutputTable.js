import React from 'react';
import MaterialTable from 'material-table';
import './Table.css';
import { identifier } from '@babel/types';

export default class OutputTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: 'Output Number',
					field: 'outputnum',
				},
				{
					title: 'Output type',
					field: 'Outputtype',
					editComponent: props => (
						<select
							name='type'
							onChange={e => this.onParamTypeChange(e, props)}>
							<option value='' />
							<option value='sklean_model'>Sklean Model/</option>
							<option value='keras_model'>Keras Model</option>
							<option value='other'>Other</option>
						</select>
					),
				},
			],
			data: [],
		};
	}

	onParamTypeChange = (e, props) => {
		const { value } = e.target;
		props.onChange(value);
	};

	componentDidMount() {
		const { data } = this.props;
		console.log('didmount', data);
		if (data) {
			this.setState({ data: data });
		}
	}
	componentDidUpdate(prevProps, prevState) {
		const { data } = this.props;
		console.log('componentDidUpdate', data);
		if (prevState.data !== this.props.data) {
			console.log('we are in the first if');
			if (prevProps.data !== this.props.data) this.setState({ data: data });
		}
		if (data === null) this.setState({ data: {} });
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
				title='Output/Serialize Table'
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

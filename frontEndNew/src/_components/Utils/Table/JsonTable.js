import React from 'react';
import MaterialTable from 'material-table';
import './Table.css';

export default class JsonTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	onParamTypeChange = (e, props) => {
		const { value } = e.target;
		props.onChange(value);
	};

	componentDidMount() {
		const { data, columns } = this.props;
		console.log('data', data, columns);
		if (data && columns) {
			this.setState({ data: data, columns: columns });
		}
		// if (columns) {
		// 	this.setState({ columns });
		// }
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	const { data, columns } = this.props;
	// 	console.log(data);
	// 	if (prevState.data !== this.props.data && this.props.data) {
	// 		this.setState({ data });
	// 	}
	// }

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
		const { data, columns } = this.state;
		return (
			<MaterialTable
				columns={columns}
				data={data}
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

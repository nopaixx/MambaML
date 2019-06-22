import React, { Component } from 'react';
import MaterialTable from 'material-table';
import './Table.css';

export default class MaterialTableDemo extends React.Component {
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
						<select name="type" onChange={e => props.onChange(e.target.value)}>
							<option value="String">String</option>
							<option value="int">int</option>
							<option value="float">float</option>
							<option value="list">list</option>
						</select>
					),
				},
				{ title: 'Value', field: 'value' },
				{ title: 'Param Help', field: 'param_help' },
				{ title: 'Param Url', field: 'param_url' },
				{ title: 'Param Rec', field: 'param_rec' },
			],
			data: [
				{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
				{
					name: 'Zerya Betül',
					surname: 'Baran',
					birthYear: 2017,
					birthCity: 34,
				},
			],
		};
	}

	render() {
		return (
			<MaterialTable
				title="Params Table"
				columns={this.state.columns}
				data={this.state.data}
				editable={{
					onRowAdd: newData =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								{
									const data = this.state.data;
									data.push(newData);
									this.setState({ data }, () => resolve());
								}
								resolve();
							}, 1000);
						}),
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								{
									const data = this.state.data;
									const index = data.indexOf(oldData);
									data[index] = newData;
									this.setState({ data }, () => resolve());
								}
								resolve();
							}, 1000);
						}),
					onRowDelete: oldData =>
						new Promise((resolve, reject) => {
							setTimeout(() => {
								{
									let data = this.state.data;
									const index = data.indexOf(oldData);
									data.splice(index, 1);
									this.setState({ data }, () => resolve());
								}
								resolve();
							}, 1000);
						}),
				}}
			/>
		);
	}
}

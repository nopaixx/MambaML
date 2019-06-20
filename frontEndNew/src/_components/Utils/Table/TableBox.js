import React, { Component } from 'react';
import './Table.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export class TableBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentParam: {},
			params: [],
		};
	}

	handleChange = e => {
		const { currentParam } = this.state;
		const { name, value } = e.target;
		this.setState({ currentParam: { ...currentParam, [name]: value } });
	};
	renderTableHeader() {
		let header = ['boxClass', 'type', 'inputPorts', 'outputPorts'];
		return header.map((key, index) => {
			return <th key={index}>{key.toUpperCase()}</th>;
		});
	}

	handleEdit = () => {};

	renderTableData() {
		return this.state.params.map((params, index) => {
			const {
				param_name,
				param_friend_name,
				type,
				value,
				param_help,
				param_url,
				param_rec,
			} = params;
			return (
				<tr
					className={'params-table-body'}
					key={index}
					onClick={this.handleEdit}>
					<td>{index}</td>
					<td>{param_name}</td>
					<td>{param_friend_name}</td>
					<td>{type}</td>
					<td>{value}</td>
					<td>{param_help}</td>
					<td>{param_url}</td>
					<td>{param_rec}</td>
				</tr>
			);
		});
	}
	renderTableInputs() {
		return (
			<tr>
				<td>
					<Input type="text" name="boxClass" defaultValue={'Python Module'} />{' '}
				</td>
				<td>
					<Input type="text" name="type" onChange={this.handleChange} />
				</td>
				<td>
					<Input type="number" name="inputPorts" onChange={this.handleChange} />
				</td>
				<td>
					<Input
						type="number"
						name="outputPorts"
						onChange={this.handleChange}
					/>
				</td>
			</tr>
		);
	}
	render() {
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<table id="students">
					<tbody>
						<tr>{this.renderTableHeader()}</tr>
						{this.renderTableData()}
						{this.renderTableInputs()}
					</tbody>
				</table>
			</div>
		);
	}
}

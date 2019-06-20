import React, { Component } from 'react';
import './Table.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

export class Table extends Component {
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
		let header = [
			'id',
			'param_name',
			'param_friend_name',
			'type',
			'value',
			'param_help',
			'param_url',
			'param_rec',
		];
		return header.map((key, index) => {
			return <th key={index}>{key.toUpperCase()}</th>;
		});
	}
	handleClickAddParam = () => {
		const { currentParam, params } = this.state;
		if (Object.keys(currentParam).length > 1) {
			const newParams = params.slice();
			newParams.push(currentParam);
			this.setState({ params: newParams, currentParam: {} });
		}
	};

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
				<td>id</td>
				<td>
					<Input type="string" name="param_name" onChange={this.handleChange} />
				</td>
				<td>
					<Input
						type="string"
						name="param_friend_name"
						onChange={this.handleChange}
					/>
				</td>
				<td>
					<select name="type" onChange={this.handleChange}>
						<option value="String">String</option>
						<option value="int">int</option>
						<option value="float">float</option>
						<option value="list">list</option>
					</select>
				</td>
				<td>
					<Input type="string" name="value" onChange={this.handleChange} />
				</td>
				<td>
					<Input type="string" name="param_help" onChange={this.handleChange} />
				</td>
				<td>
					<Input type="string" name="param_url" onChange={this.handleChange} />
				</td>
				<td>
					<Input
						type="checkbox"
						name="param_rec"
						value="true"
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
				<Button label={'Add param'} onClick={this.handleClickAddParam} />
			</div>
		);
	}
}

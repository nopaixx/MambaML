export const PythonModule_PythonScript = {
	id: `node2`,
	type: 'Python Module-Python Script',
	properties: {
		payload: {
			code:
				'def FUNCTION_ID_1(input1=None, input2=None, input3=None, input4=None, input5=None):\n\r' +
				'\tout1=None\n\r' +
				'\tout1=None\n\r' +
				'\tout3=None\n\r' +
				'\tout4=None\n\r' +
				'\tout2=None\n\r' +
				'\tval = 5*5\n\r' +
				'\tout1 = val\n\r' +
				'\tout2 = val*5\n\r' +
				'\tout3 = out2*5\n\r' +
				'\treturn val, out1, out2, out3\n\r',
			ninput: 5,
			nouts: 4,
		},
	},
	position: {
		x: 300,
		y: 300,
	},
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
				value: 'no',
			},
		},
		port3: {
			id: 'port3',
			type: 'input',
			properties: {
				value: 'no',
			},
		},
		port4: {
			id: 'port4',
			type: 'input',
			properties: {
				value: 'no',
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
				value: 'no',
			},
		},
		port7: {
			id: 'port7',
			type: 'output',
			properties: {
				value: 'no',
			},
		},
		port8: {
			id: 'port8',
			type: 'output',
			properties: {
				value: 'no',
			},
		},
		port9: {
			id: 'port9',
			type: 'output',
			properties: {
				value: 'no',
			},
		},
	},
};

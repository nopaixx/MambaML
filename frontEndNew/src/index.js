import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './App/App';
import { store } from './_helpers';
import * as serviceWorker from './serviceWorker';
import { configureFakeBackend } from './_helpers';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#f9efef',
			main: '#b43539',
			dark: '#a52024',
			contrastText: '#fff',
		},
		secondary: {
			light: '#60d6d6',
			main: '#42cece',
			dark: '#c3e6cb',
			contrastText: '#155724',
		},
		third: {
			light: '#fff',
			main: '#464646',
			dark: '#b43539',
			contrastText: '#b43539',
			lightText: 'rgba(249, 250, 184, 0.767)',
		},
		four: {
			light: 'rgb(255, 44, 44)',
			main: 'rgb(255, 220, 167)',
			dark: 'rgb(0, 0, 0)',
			contrastText: '#fff',
		},
		success: {
			main: '#4caf50',
			contrastText: '#fff',
		},
	},
	appBar: { height: 50 },
});
configureFakeBackend();
ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<Provider store={store}>
			<App />
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

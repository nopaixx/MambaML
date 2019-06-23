import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './App/App';
import { store } from './_helpers';
import * as serviceWorker from './serviceWorker';
import { configureFakeBackend } from './_helpers';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#d38c8c',
			main: '#b43539',
			dark: '#a52024',
			contrastText: '#fff',
		},
	},
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

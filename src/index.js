import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Provider } from 'react-redux';

import store from './redux/store';
import App from './components/app';

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ThemeProvider>
				<CSSReset />
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

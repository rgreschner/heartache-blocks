import 'reflect-metadata';
import { container } from './shared/container.const';
import { configureContainer } from './container.config';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { App } from './core/app';
import { DebugUtilsService } from './shared/dev/debug-utils.service';
import { InitializationService } from './core/initialization.service';
import './index.css';
import { history } from './core/history.const';
import { store } from './shared/state/app.store';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

// Initialize dependencies first.
configureContainer(container);

const debugUtils = container.get(DebugUtilsService);
(window as any).DebugUtils = debugUtils;

const initializationService = container.get(InitializationService);
initializationService.initialize().then(() =>
	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>,
		document.getElementById('root')
	)
);

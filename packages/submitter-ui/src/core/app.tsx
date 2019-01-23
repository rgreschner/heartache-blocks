import React, { Component } from 'react';
import { SubmissionFormContainer } from '../submission-form/submission-form.container';
import { Helmet } from 'react-helmet';
import { Route, Switch, Redirect } from 'react-router-dom';

import 'antd/dist/antd.css';
import './app.css';
import { SetContractPage } from '../set-contract/set-contract.page';
import { NotFoundPage } from '../not-found/not-found.page';
import { InvalidContractPage } from '../invalid-contract/invalid-contract.page';
import { CloudsComponent } from '../clouds/clouds.component';

/**
 * Main app component.
 */
export class App extends Component {
	constructor(props: any) {
		super(props);
	}

	public render() {
		return (
			<>
				<Helmet>
					<title>
						Heartache Blocks - A Heartache Box for Blockchain
					</title>
				</Helmet>
				<div className="App">
					<header className="App-header">
						<h1>Heartache Blocks</h1>
						<h5>A Heartache Box for Blockchain</h5>
					</header>
					<Switch>
						<Route
							path="/set-contract"
							component={SetContractPage}
						/>
						<Route
							path="/invalid-contract"
							component={InvalidContractPage}
						/>
						<Route
							path="/write"
							component={SubmissionFormContainer}
						/>
						<Route component={NotFoundPage} />
					</Switch>
				</div>
				<CloudsComponent style={{ width: '256px', height: '256px' }} />
			</>
		);
	}
}

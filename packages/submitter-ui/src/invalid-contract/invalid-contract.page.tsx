import React, { Component } from 'react';
import { destroyStream } from '../shared/lifecycle/destroy-stream.decorator';
import { stateFromStore } from '../shared/state/state-from-store.decorator';
import { AppState } from '../shared/state/app.state';
import { HeartacheBoxContractState } from '../shared/state/heartache-box-contract.state';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

/**
 * Page displaying information that
 * entered contract address is invalid.
 */
@destroyStream()
@stateFromStore((state: AppState) => state.contract)
export class InvalidContractPage extends Component<
	any,
	HeartacheBoxContractState
> {
	public render() {
		const state = this.state;
		return (
			<>
				<h2 style={{color: 'red', fontWeight: 'bold'}}>Invalid Contract</h2>
				<span>The contract you have entered is invalid. Please check the contract's Ethereum address and try again.</span>
				<Link to="/set-contract">
					<Button type="primary" size="large" style={{marginTop: '16px'}}>
						Go Back
					</Button>
				</Link>
			</>
		);
	}
}

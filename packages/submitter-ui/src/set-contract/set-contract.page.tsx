import React, { Component, FormEvent } from 'react';
import { destroyStream } from '../shared/lifecycle/destroy-stream.decorator';
import { stateFromStore } from '../shared/state/state-from-store.decorator';
import { AppState } from '../shared/state/app.state';
import { Store } from 'redux';
import { Input, Form } from 'antd';
import { Button } from 'antd';
import { HeartacheBoxContractState } from '../shared/state/heartache-box-contract.state';
import { createWeb3 } from '../shared/ethereum/create-web3.const';
import { ActionType } from '../shared/action-type.enum';

/**
 * Page for entering contract address.
 */
@destroyStream()
@stateFromStore((state: AppState) => state.contract)
export class SetContractPage extends Component<any, HeartacheBoxContractState> {
	private _store!: Store<AppState>;

	public render() {
		const state = this.state;
		return (
			<>
				<h2 style={{ fontWeight: 'bold' }}>Enter Contract Address</h2>
				<Form
					layout="vertical"
					onSubmit={(e: FormEvent<any>) => this.handleSubmit(e)}
				>
					<Form.Item>
						Please enter a valid Ethereum address for a Heartache
						Blocks Contract and press apply.
					</Form.Item>
					<Form.Item>
						<Input
							name="contract-address"
							autoComplete="on"
							value={state.address || ''}
							onChange={(e: any) =>
								this.onTextChange(e.nativeEvent.target.value)
							}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							htmlType="submit"
							type="primary"
							size="large"
							disabled={!state.address || !state.isValidAddress}
						>
							Apply
						</Button>
					</Form.Item>
				</Form>
			</>
		);
	}

	private async onTextChange(contractAddress: string) {
		this._store.dispatch({
			type: ActionType.SetContractAddress,
			payload: { contractAddress }
		});
		const isValidAddress = await this.isContractAddressValid(
			contractAddress
		);
		this._store.dispatch({
			type: ActionType.SetIsContractAddressValid,
			payload: { isValidAddress }
		});
	}

	private async isContractAddressValid(contractAddress: string) {
		const web3 = await createWeb3();
		return Promise.resolve(web3.utils.isAddress(contractAddress));
	}

	private handleSubmit(e: FormEvent<any>): any {
		e.preventDefault();
		this._store.dispatch({
			type: ActionType.ApplyContract
		});
	}
}

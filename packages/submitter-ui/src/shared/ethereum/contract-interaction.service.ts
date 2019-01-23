import { injectable } from 'inversify';
import { HeartacheBox } from '../types/web3-contracts/HeartacheBox';
import { Store, AnyAction } from 'redux';
import { AppState } from '../state/app.state';
import { container } from '../container.const';
import { AppStore } from '../state/app.store';
import { createWeb3 } from './create-web3.const';
import { push } from 'connected-react-router';
import { ContractClassFactoryService } from './contract-class-factory.service';
import { ActionType } from '../action-type.enum';

// TODO: Unclear separation of concerns with ContractClassFactoryService,
// probably in need of refactoring!
@injectable()
export class ContractInteractionService {
	private _store!: Store<AppState, AnyAction>;

	constructor() {
		this._store = container.get(AppStore);
	}

	public async applyContract() {
		let contractInstance: HeartacheBox | undefined = undefined;
		try {
			contractInstance = await this.test();
			await this.assertContractValidity(contractInstance);
		} catch (err) {
			this._store.dispatch({
				type: ActionType.ContractValidityCheckFailed,
				payload: { error: err }
			});
			this._store.dispatch(push('/invalid-contract'));
			return;
		}
		this._store.dispatch({
			type: ActionType.SetContractInstance,
			payload: { instance: contractInstance }
		});
		this._store.dispatch({
			type: ActionType.ContractValidityChanged,
			payload: { isValid: true }
		});
		this._store.dispatch(push('/write'));
	}

	private async assertContractValidity(contractInstance: HeartacheBox) {
		// Basic contract sanity check.
		// If it has no owner this is an error.
		const owner = await contractInstance.methods.owner().call();
		if (!owner)
			return Promise.reject(new Error('Invalid contract, has no owner.'));
	}

	// TODO: Refactor/rename!
	public async test(): Promise<HeartacheBox> {
		await (window as any).ethereum.enable();
		const factory = new ContractClassFactoryService();
		const address = this._store.getState().contract.address;
		if (!address) return Promise.reject(new Error());
		const web3 = await createWeb3();
		if (!web3.utils.isAddress(address)) return Promise.reject(new Error('Invalid address.'));
		const contractInstance = await factory.create(address);
		return contractInstance;
	}
}

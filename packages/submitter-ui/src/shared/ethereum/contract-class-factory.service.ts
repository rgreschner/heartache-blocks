import HeartacheBoxContract from '../HeartacheBox.json';
import { HeartacheBox } from '../types/web3-contracts/HeartacheBox';
import { Store, AnyAction } from 'redux';
import { AppState } from '../state/app.state';
import { container } from '../container.const';
import { AppStore } from '../state/app.store';
import { CustomOptions } from 'web3/eth/contract';
import { createWeb3 } from './create-web3.const';

/**
 * Factory responsible for creation of
 * contract class objects.
 */
export class ContractClassFactoryService {
	private _store!: Store<AppState, AnyAction>;

	constructor() {
		this._store = container.get(AppStore);
	}

	/**
	 * Load contract from JSON.
	 * @param path Path to contract JSON.
	 */
	public async loadContract() {
		const result: any = HeartacheBoxContract;
		return Promise.resolve(result);
	}

	/**
	 * Create contract class from JSON.
	 * @param path Path to contract JSON.
	 */
	public async create(address: string): Promise<HeartacheBox> {
		const contractJSON = await this.loadContract();
		const contractABI = contractJSON.abi;
		const from = this._store.getState().submissionForm
			.ethereumSenderAddress;
		// Actually create contract from ABI.
		const web3 = await createWeb3();
		const customOpts: CustomOptions = { from };
		const contractInstance = new web3.eth.Contract(
			contractABI,
			address,
			customOpts
		) as HeartacheBox;
		return Promise.resolve(contractInstance);
	}
}

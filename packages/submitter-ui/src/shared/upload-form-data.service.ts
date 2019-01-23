import { Receipt } from "../submission-form/receipt.model";
import { injectable, inject } from "inversify";
import { ContractInteractionService } from "./ethereum/contract-interaction.service";
import { AppStore } from "./state/app.store";
import { AppState } from "./state/app.state";
import { Store, AnyAction } from "redux";
import { container } from "./container.const";
import { ViewState } from "../submission-form/view-state.enum";
import { interval } from "rxjs";
import { take } from "rxjs/operators";
import * as openpgp from "openpgp";
import { IPFSFactory } from "./ipfs.factory";
import { ActionType } from "./action-type.enum";

/**
 * Service responsible for upload
 * of complaint form data.
 */
// TODO: In need of major refactoring!
// Rename/extract methods etc.
@injectable()
export class UploadFormDataService {
	static GAS_DEFAULTS = {
		gas: 4712388,
		gasPrice: 100000000000
	};

	@inject(ContractInteractionService)
	private _contractInteractionService!: ContractInteractionService;

	@inject(IPFSFactory) private _ipfsFactory: any;

	private _ipfs: any;

	private _store!: Store<AppState, AnyAction>;
	private _publicKeyHash?: string;

	constructor() {
		this._store = container.get(AppStore);
	}

	public initialize() {
		this._ipfs = this._ipfsFactory.create();
	}

	private async uploadOnIPFS(encryptedText: string): Promise<Receipt> {
		const data = this._ipfs.types.Buffer.from(encryptedText);
		let uploadedHashes: any[] = [];
		try {
			uploadedHashes = await this._ipfs.add(data);
		} catch (err) {
			const thrownErr: Error | any = new Error(
				"Error uploading file to IPFS."
			);
			thrownErr.innerError = err;
			return Promise.reject(thrownErr);
		}
		const receipt = {
			id: uploadedHashes[0].hash,
			type: "ipfs"
		};
		return Promise.resolve(receipt);
	}

	private async getPublicKeys() {
		const fileId = this._publicKeyHash;
		if (!fileId)
			return Promise.reject(
				new Error("Error retrieving public key from invalid hash.")
			);
		console.log(`Retrieving public key from hash: ${fileId}`);
		const getFilePromise = Promise.race([
			this._ipfs.get(fileId),
			interval(60 * 1000)
				.pipe(take(1))
				.toPromise()
				.then(() => Promise.reject(new Error("Timeout.")))
		]);
		let files: any[] = [];
		try {
			files = await getFilePromise;
		} catch (err) {
			const thrownErr: Error | any = new Error(
				"Error retrieving public key from hash."
			);
			thrownErr.innerError = err;
			return Promise.reject(thrownErr);
		}
		console.log(`Retrieved public key.`);
		console.log(files);
		const publicKeyAscii = this.getPublicKeyAsciiFromHashes(files);
		console.log("publicKeyAscii", publicKeyAscii, publicKeyAscii.length);
		try {
			const publicKeys = await this.getPublicKeysFromAscii(
				publicKeyAscii
			);
			if (publicKeys.length == 0) throw new Error("Key length 0.");
			console.log("publicKeys", publicKeys);
			return Promise.resolve(publicKeys);
		} catch (err) {
			const thrownErr: Error | any = new Error(
				"Error reading public key."
			);
			thrownErr.innerError = err;
			return Promise.reject(thrownErr);
		}
	}
	private async getPublicKeysFromAscii(
		publicKeyAscii: string
	): Promise<any[]> {
		const readKeys = await openpgp.key.readArmored(publicKeyAscii);
		return readKeys.keys;
	}

	private getPublicKeyAsciiFromHashes(files: any[]): string {
		return files[0].content.toString();
	}

	private async crypto(text: string) {
		const publicKeys = await this.getPublicKeys();
		const message = openpgp.message.fromText(text);
		const options = {
			message,
			publicKeys
		};
		const encryptionResult = await openpgp.encrypt(options);
		const encryptedMessage = encryptionResult.data;
		console.log(encryptedMessage);
		return Promise.resolve(encryptedMessage);
	}

	// TODO: Refactor/extract method!!!
	public async send(text: string) {
		const ethereumSenderAddress = (window as any).web3.eth.defaultAccount;
		this._store.dispatch({
			type: ActionType.SetEthereumSenderAddress,
			payload: {
				ethereumSenderAddress
			}
		});
		await interval(100)
			.pipe(take(1))
			.toPromise();
		const contract = await this._contractInteractionService.test();
		try {
			this._publicKeyHash = await contract.methods
				.getPublicKeyHash()
				.call();
			if (!this._publicKeyHash)
				throw new Error("Retrieved file hash is null.");
		} catch (err) {
			this._store.dispatch({
				type: ActionType.SetViewState,
				payload: { value: ViewState.SubmitFailed }
			});
			const thrownErr: Error | any = new Error(
				"Error retrieving public key hash from contract."
			);
			thrownErr.innerError = err;
			return Promise.reject(thrownErr);
		}
		const sentAt = new Date();
		const payload = { text, sentAt };
		const serializedPayload = JSON.stringify(payload);
		let encryptedMessage = "";
		try {
			encryptedMessage = await this.crypto(serializedPayload);
		} catch (err) {
			this._store.dispatch({
				type: ActionType.SetViewState,
				payload: { value: ViewState.SubmitFailed }
			});
			return;
		}
		const receipt = await this.uploadOnIPFS(encryptedMessage);
		console.log(receipt);
		await interval(1000)
			.pipe(take(1))
			.toPromise();
		this._store.dispatch({
			type: ActionType.SetReceipt,
			payload: { receipt }
		});
		this._store.dispatch({
			type: ActionType.SetViewState,
			payload: { value: ViewState.SubmittingContract }
		});
		try {
			const txData = await contract.methods.addMessageHash(receipt.id).send({
				...UploadFormDataService.GAS_DEFAULTS
			});
			//console.log(txData);
			this._store.dispatch({
				type: ActionType.SetViewState,
				payload: { value: ViewState.SubmittedAll }
			});
		} catch (err) {
			this._store.dispatch({
				type: ActionType.SetViewState,
				payload: { value: ViewState.SubmitFailed }
			});
		}
		return Promise.resolve({ encryptedMessage, receipt });
	}
}

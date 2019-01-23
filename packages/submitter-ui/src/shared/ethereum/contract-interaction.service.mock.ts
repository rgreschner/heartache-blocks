import { injectable } from "inversify";
import { HeartacheBox } from "../types/web3-contracts/HeartacheBox.d";
import sinon from "sinon";
import { TransactionObject } from "web3/eth/types";

/**
 * Mocked contract methods.
 */
class HeartacheBoxMethodsMock {
	getMessageHashAtIndex(
		index: number | string
	): TransactionObject<string> | null {
		return null;
	}
	renounceOwnership(): TransactionObject<void> | null {
		return null;
	}
	transferOwnership(newOwner: string): TransactionObject<void> | null {
		return null;
	}
	addMessageHash(id: string): TransactionObject<string> | null {
		return null;
	}
	owner(): TransactionObject<string> | null {
		return null;
	}
	isOwner(): TransactionObject<boolean> | null {
		return null;
	}
	getMessageCount(): TransactionObject<string> | null {
		return null;
	}
	getPublicKeyHash(): TransactionObject<string> | null {
		return null;
	}
}

/**
 * Mocked contract interaction service.
 */
@injectable()
export class MockContractInteractionService {

	static TEST_PUBLIC_KEY_IPFS_HASH = "QmeUigLRYN4FzK8iun23gpF4p29g5xRyn9iqxy9SArqTrD";

	public async test(): Promise<HeartacheBox> {
		const contractInstance = {} as HeartacheBox;
		const contractMethods = new HeartacheBoxMethodsMock();
		(contractInstance as any).methods = contractMethods;
		const createCallStub = (methods, methodName) => {
			const callStub = sinon.stub();
			const methodStub = sinon.stub(methods, methodName).returns({
				call: callStub
			});
			methodStub.stubs = {
				...methodStub.stubs,
				call: callStub
			};
			return callStub;
		};
		createCallStub(contractMethods, "getPublicKeyHash").returns(
			Promise.resolve(MockContractInteractionService.TEST_PUBLIC_KEY_IPFS_HASH)
		);
		return contractInstance;
	}
}

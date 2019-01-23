import { injectable } from "inversify";
import * as IPFS from "ipfs";

/**
 * Factory for IPFS client.
 */
@injectable()
export class IPFSFactory {
	public create() {
		return new IPFS();
	}
}

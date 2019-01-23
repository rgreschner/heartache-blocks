import * as openpgp from 'openpgp';
import { injectable } from 'inversify';

/**
 * Performs app initialization.
 */
@injectable()
export class InitializationService {
	private startOpenPgpWorker() {
		openpgp.initWorker({ path: 'openpgp.worker.min.js' });
	}

	public async initialize() {
		this.startOpenPgpWorker();
		return Promise.resolve();
	}
}

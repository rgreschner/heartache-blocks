import { container } from '../container.const';
import { injectable } from 'inversify';

/**
 * Debug utilities for
 * development.
 */
@injectable()
export class DebugUtilsService {
	public get container() {
		return container;
	}
}

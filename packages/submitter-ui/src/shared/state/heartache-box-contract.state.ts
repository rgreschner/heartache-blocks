import { HeartacheBox } from "../types/web3-contracts/HeartacheBox";

/**
 * Contract state.
 */
export interface HeartacheBoxContractState {
	instance: HeartacheBox | undefined;
	address: string | undefined;
    isValid: boolean;
    isValidAddress: boolean;
	validityCheckError: Error | undefined;
}

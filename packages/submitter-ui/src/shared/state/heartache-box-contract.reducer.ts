import { AnyAction } from "redux";
import { HeartacheBoxContractState } from "./heartache-box-contract.state";
import INITIAL_APP_STATE from "./initial-app-state.const";
import { container } from "../container.const";
import { ContractInteractionService } from "../ethereum/contract-interaction.service";
import { createWeb3 } from "../ethereum/create-web3.const";
import { ActionType } from "../action-type.enum";

export const heartacheBoxContractReducer = (
	prevState: HeartacheBoxContractState = INITIAL_APP_STATE.contract,
	action: AnyAction
): HeartacheBoxContractState => {
	let state = { ...prevState };
	switch (action.type) {
		case ActionType.Reset:
			break;
		case ActionType.SetContractAddress:
			state.address = action.payload.contractAddress;
			break;
		case ActionType.SetIsContractAddressValid:
			state.isValidAddress = action.payload.isValidAddress;
			break;
		case ActionType.ApplyContract:
			setTimeout(() =>
				container.get(ContractInteractionService).applyContract()
			);
			break;
		case ActionType.ContractValidityChanged:
			state.isValid = action.payload.isValid;
			break;
		case ActionType.ContractValidityCheckFailed:
			state.isValid = false;
			state.validityCheckError = action.payload.error;
			break;
		case ActionType.SetContractInstance:
			state.instance = action.payload.instance;
			break;
	}
	return state;
};

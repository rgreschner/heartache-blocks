import { SubmissionFormState } from "../../submission-form/submission-form.state";
import { HeartacheBoxContractState } from "./heartache-box-contract.state";

/**
 * Global redux app state.
 */
export interface AppState {
	submissionForm: SubmissionFormState;
	contract: HeartacheBoxContractState;
	router: any;
}

import { ViewState } from "./view-state.enum";
import { Receipt } from "./receipt.model";

/**
 * Submission form state.
 */
export interface SubmissionFormState {
	text: string;
	viewState: ViewState;
	receipt: Receipt | undefined;
	ethereumSenderAddress: string | undefined;
}

import { AppState } from "./app.state";
import { ViewState } from "../../submission-form/view-state.enum";

/**
 * Initial app state.
 */
const INITIAL_APP_STATE: AppState = {
	submissionForm: {
		text: '',
		viewState: ViewState.Write,
		receipt: undefined,
		ethereumSenderAddress: undefined
	},
	contract: {
		address: undefined,
		instance: undefined,
		isValid: false,
		isValidAddress: false,
		validityCheckError: undefined
	},
	router: undefined
};
export default INITIAL_APP_STATE;

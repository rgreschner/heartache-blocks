import { AnyAction } from "redux";
import { SubmissionFormState } from "./submission-form.state";
import INITIAL_APP_STATE from "../shared/state/initial-app-state.const";
import { ViewState } from "./view-state.enum";
import { container } from "../shared/container.const";
import { UploadFormDataService } from "../shared/upload-form-data.service";
import { ActionType } from "../shared/action-type.enum";

/**
 * Reducer for complaint submission.
 * @param prevState Previous state.
 * @param action Action.
 */
export const submissionFormReducer = (
	prevState: SubmissionFormState = INITIAL_APP_STATE.submissionForm,
	action: AnyAction
): SubmissionFormState => {
	let state = { ...prevState };
	switch (action.type) {
		case ActionType.Reset:
			delete state.receipt;
			state.text = INITIAL_APP_STATE.submissionForm.text;
			state.viewState = ViewState.Write;
			break;
		case ActionType.SetText:
			state.text = action.payload.text;
			break;
		case ActionType.SetViewState:
			state.viewState = action.payload.value;
			break;
		case ActionType.SetReceipt:
			state.receipt = action.payload.receipt;
			break;
		case ActionType.SubmitFormData:
			state.viewState = ViewState.SubmittingIPFS;
			const uploadFormDataService = container.get<UploadFormDataService>(UploadFormDataService);
			setImmediate(async () => {
				try {
					await uploadFormDataService.send(action.payload.text);
				} catch (err) {

				}
			});
			break;
		case ActionType.SetEthereumSenderAddress:
			state.ethereumSenderAddress = action.payload.ethereumSenderAddress;
			break;
	}
	return state;
};

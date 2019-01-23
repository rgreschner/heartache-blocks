import { combineReducers, AnyAction } from "redux";
import { submissionFormReducer } from "../../submission-form/submission-form.reducer";
import { heartacheBoxContractReducer } from "./heartache-box-contract.reducer";
import { connectRouter } from 'connected-react-router';

/**
 * Root reducer.
 */
const rootReducer = combineReducers<any, any>({
	submissionForm: submissionFormReducer,
	contract: heartacheBoxContractReducer,
	router: connectRouter(history)
});

export default rootReducer;

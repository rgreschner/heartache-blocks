import { createStore, AnyAction, compose, applyMiddleware } from "redux";
import rootReducer from "./root.reducer";
import { AppState } from "./app.state";
import { routerMiddleware } from "connected-react-router";
import { history } from "../../core/history.const";
import INITIAL_APP_STATE from "./initial-app-state.const";

const useDevTools = true;

const AppStore = Symbol("AppStore");
const composeEnhancers =
	typeof window === "object" &&
	useDevTools &&
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

// Redux app store.
const store = createStore<AppState, AnyAction, any, any>(
	rootReducer,
	INITIAL_APP_STATE,
	composeEnhancers(applyMiddleware(routerMiddleware(history)))
);
export { AppStore, store };

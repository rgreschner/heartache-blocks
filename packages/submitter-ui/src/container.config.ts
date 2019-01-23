import { Container } from "inversify";
import { Store } from "redux";
import { AppState } from "./shared/state/app.state";
import { AppStore, store } from "./shared/state/app.store";
import { UploadFormDataService } from "./shared/upload-form-data.service";
import { ContractInteractionService } from "./shared/ethereum/contract-interaction.service";
import { InitializationService } from "./core/initialization.service";
import { DebugUtilsService } from "./shared/dev/debug-utils.service";
import { IPFSFactory } from "./shared/ipfs.factory";

/**
 * Configure dependencies.
 * @param container Container to configure dependencies on.
 */
export const configureContainer = (container: Container) => {
	container.bind<InitializationService>(InitializationService).toSelf().inSingletonScope();
	container.bind<DebugUtilsService>(DebugUtilsService).toSelf().inSingletonScope();
	container.bind<IPFSFactory>(IPFSFactory).toSelf().inSingletonScope();	
	container.bind<Store<AppState>>(AppStore).toConstantValue(store);
	container.bind<UploadFormDataService>(UploadFormDataService).toSelf().inSingletonScope()
		.onActivation((context, uploadFormDataService) => {
			uploadFormDataService.initialize();
			return uploadFormDataService;
		});
	container.bind<ContractInteractionService>(ContractInteractionService).toSelf().inSingletonScope();
};

import { expect } from "chai";
import * as sinon from "sinon";

const textEncoding = require("text-encoding-utf-8");
(global as any).TextEncoder = textEncoding.TextEncoder;
(global as any).TextDecoder = textEncoding.TextDecoder;

import * as openpgp from "openpgp";
openpgp.initWorker({ path: "openpgp.worker.js" });

import "reflect-metadata";
import "./window.mock";
import "./navigator.mock";
import { mockIPFS } from "./ipfs.mock";

import { container } from "./container.const";
import { UploadFormDataService } from "./upload-form-data.service";
import { IPFSFactory } from "./ipfs.factory";
import { Store } from "redux";
import { AppState } from "./state/app.state";
import { AppStore, store } from "./state/app.store";
import { ContractInteractionService } from "./ethereum/contract-interaction.service";

sinon.stub(IPFSFactory.prototype, "create").returns(mockIPFS);

container
	.bind<ContractInteractionService>(ContractInteractionService)
	.toSelf()
	.inSingletonScope();
container
	.bind<IPFSFactory>(IPFSFactory)
	.toSelf()
	.inSingletonScope();
container
	.bind<UploadFormDataService>(UploadFormDataService)
	.toSelf()
	.inSingletonScope()
	.onActivation((context, uploadFormDataService) => {
		uploadFormDataService.initialize();
		return uploadFormDataService;
	});
container.bind<Store<AppState>>(AppStore).toConstantValue(store);

describe("foo", () => {
	it("should work", async () => {
		const uploadFormDataService = container.get(UploadFormDataService);
		expect(uploadFormDataService).to.exist;
		expect((uploadFormDataService as any)._ipfs).to.exist;
        const {receipt, encryptedMessage}: any = await uploadFormDataService.send("foobar");
        expect(receipt).to.exist;
        expect(receipt.id).to.equal('test');
        expect(receipt.type).to.equal('ipfs');
        expect(encryptedMessage).to.contain('BEGIN PGP MESSAGE');
        expect(encryptedMessage).to.contain('END PGP MESSAGE');
	});
});

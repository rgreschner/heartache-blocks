import { JSDOM } from "jsdom";
const Web3 = require("web3");

/**
 * Mocked window object.
 */

const window: any = new JSDOM();
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
provider.enable = () => {};
const web3 = new Web3();
web3.setProvider(provider);
window.ethereum = provider;
window.web3 = web3;
(global as any).window = window;
export { window };

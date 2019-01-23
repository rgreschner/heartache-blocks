import Web3 from 'web3';

/**
 * Integration of newer Web3 versions > 1.0.0.
 * Requires specific version of web3 for now.
 */

let web3: Web3 | null = null;
export const createWeb3 = async (): Promise<Web3> => {
    if (!!web3) return web3;
    const ethereum = (window as any).ethereum;
    await ethereum.enable();
    web3 = new Web3(ethereum);
    return Promise.resolve(web3);
}

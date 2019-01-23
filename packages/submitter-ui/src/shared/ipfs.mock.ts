import axios from "axios";

/**
 * Mockup for IPFS client.
 */
export const mockIPFS = {
	get: async (hash) => {
		const res = await axios.get(`https://ipfs.io/ipfs/${hash}`);
		const content = new Buffer(res.data);
		return Promise.resolve([{ content }]);
	},
	add: () => {
		return Promise.resolve([{ hash: "test" }]);
	},
	types: { Buffer }
};
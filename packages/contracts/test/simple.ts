import { expect } from 'chai';

declare var artifacts: any;
declare var contract: any;

const HeartacheBox = artifacts.require('HeartacheBox');

/**
 * Test-suite for HeartacheBox contract.
 */
contract('HeartacheBox', (accounts: string[]) => {

	/**
	 * Deployed contract instance.
	 */
	let instance: any = null;

	/**
	 * Deploy instance before doing anything.
	 */
	before(async () => {
		instance = await HeartacheBox.deployed();
	});

	it('should be deployed', async () => {
		console.log(`Contract deployed @ ${instance.address}`);
		expect(instance.address).to.not.be.null;
	});

	/**
	 * Test-suite for Ownable base.
	 */
	describe('as Ownable', () => {

		it('should be owned', async () => {
			const isOwner = await instance.isOwner();
			expect(isOwner).to.be.true;
			const owner = await instance.owner();
			expect(owner).to.equal(accounts[0]);
		});

	});

	/**
	 * Test-suite for message manipulation.
	 */
	describe('messages', () => {

		it('should work', async () => {
			let count = await instance.getMessageCount();
			expect(count.toNumber()).to.equal(0);
			await instance.addMessageHash('abc');
			count = await instance.getMessageCount();
			expect(count.toNumber()).to.equal(1);
			const message = await instance.getMessageHashAtIndex(0);
			expect(message).to.equal('abc');
		});

		it('should get public key hash', async () => {
			const publicKeyHash = await instance.getPublicKeyHash();
			expect(publicKeyHash).to.equal('QmeUigLRYN4FzK8iun23gpF4p29g5xRyn9iqxy9SArqTrD');
		});

	});

});

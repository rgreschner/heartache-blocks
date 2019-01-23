const HeartacheBox = artifacts.require("./HeartacheBox.sol");
const DEFAULT_PUBLIC_KEY_HASH = 'QmeUigLRYN4FzK8iun23gpF4p29g5xRyn9iqxy9SArqTrD';

module.exports = function(deployer) {
  deployer.deploy(HeartacheBox, DEFAULT_PUBLIC_KEY_HASH);
};

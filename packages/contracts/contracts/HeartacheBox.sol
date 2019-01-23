pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

contract HeartacheBox is Ownable, Pausable  {
    string[] private _messageIds;
    string private _publicKeyHash;

    constructor(string memory publicKeyHash) public {
        _publicKeyHash = publicKeyHash;
    }

    function addMessageHash(string memory id) public whenNotPaused returns (uint256) {
        _messageIds.push(id);
        uint256 index = _messageIds.length - 1;
        return index;
    }

    function getMessageHashAtIndex(uint256 index) public view whenNotPaused returns (string memory) {
        return _messageIds[index];
    }

    function getMessageCount() public view whenNotPaused returns (uint256) {
        return _messageIds.length;
    }

    function getPublicKeyHash() public view whenNotPaused returns (string memory) {
        return _publicKeyHash;
    }

}

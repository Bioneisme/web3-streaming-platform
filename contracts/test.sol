// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Inbox {
    mapping(string => string) public ipfsInbox;
    //Events
    event ipfsSent(string _ipfsHash, string _address);
    event inboxResponse(string response);
    //Modifiers
    modifier notFull (string memory _string) {
        bytes memory stringTest = bytes(_string);
        require(stringTest.length == 0);
        _;
    }
    //takes in receiver's address and IPFS hash. Places the IPFSadress in the receiver's inbox
    function sendIPFS(string memory _address, string memory _ipfsHash) public {
        ipfsInbox[_address] = _ipfsHash;
        emit ipfsSent(_ipfsHash, _address);
    }
    //retrieves hash
    function getHash(string memory _address) public view returns (string memory) {
        string memory ipfs_hash = ipfsInbox[_address];
        //emit inboxResponse(ipfs_hash);
        return ipfs_hash;
    }
}

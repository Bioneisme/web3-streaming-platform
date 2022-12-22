// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../.deps/npm/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StreamToken is ERC20{
    constructor() ERC20("StreamToken", "STN"){
        _mint(msg.sender, 1000*10**18);
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }
}
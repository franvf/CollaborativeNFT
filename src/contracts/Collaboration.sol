//SPDX-License-Identifier: MIT  

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract checkOwnership {
    IERC721 MyCollection;

    constructor(address collectionContract) {
        MyCollection = IERC721(collectionContract);
    }

    function getBalanceOf() public view returns(bool){
        return MyCollection.balanceOf(msg.sender) > 0;
    }
}
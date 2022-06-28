// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyCollection is ERC721URIStorage {
   
    constructor() ERC721("TestCollection", "TCL")  { }

    function mint() public { //Make it only executable by the owner
        _mint(msg.sender, 1);
        //_setTokenURI(tokenId, "https://gateway.pinata.cloud/ipfs/QmZZHgbCrSHdh8TVyTK9KaHigPDtkDuW2MngdVEqmP7XdJ");
    }

    function modifyURI(uint tokenId) public {
       require(_exists(tokenId), "The tokenID selected does not exists");
       string memory tokenUri = getURI(tokenId);
        _setTokenURI(tokenId, tokenUri);
    }

    function getURI(uint tokenId) private pure returns(string memory)  {
        return string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/QmafLYQw7eDoVWSQGLF8tpwpdR5iVVXQWrvQgopPyVyC7v/",Strings.toString(tokenId),".json"));
    }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol"; 
import "../../node_modules/@openzeppelin//contracts/access/Ownable.sol";

import "./FirstCollection.sol";

contract SecondCollection is ERC721, Ownable  {

    //state variables
    FirstCollection firstCollection;
    uint256 deploymentTime;
    uint16 tokenId = 0;
    string constant baseURI = "https://gateway.pinata.cloud/ipfs/Qmac8mUyNQ7JrJWAorZvSCjrsMzKB5MJuvPpJfnv85dhjd/";

    constructor(address firstCollectionAddress) ERC721("Second Collection", "2CO") {
        firstCollection = FirstCollection(firstCollectionAddress);
        deploymentTime = block.timestamp;
     }

    function mint() external payable {
        require(tokenId <= 99, "All the NFTs has been minted");
        
        uint256 currentTime = block.timestamp;
        uint256 price;

        //Only owners of First Collection can mint 1 NFT during first week
        if(deploymentTime + 1 weeks >= currentTime){
            require(firstCollection.balanceOf(msg.sender) >= 1, "You are not firstCollection NFT owner");
            require(balanceOf(msg.sender) == 0, "You already minted your NFT");

            price = 0.25 ether;
            require(msg.value == price, "price is not correct");
        } else {
            price = 0.50 ether;
            require(msg.value == price, "price is not correct");
        }

        _mint(msg.sender, tokenId);
        tokenId += 1;

        (bool success, ) = payable(owner()).call{value: msg.value}(""); //Pay the NFT and send the ETH to the owner
        require(success, "Payment fail");
    }

    function tokenURI(uint tokenNum) public pure override returns(string memory)  {
        return string(abi.encodePacked(baseURI, Strings.toString(tokenNum), ".json"));
    }

}
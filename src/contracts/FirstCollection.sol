// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../../node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "../../node_modules/@openzeppelin//contracts/access/Ownable.sol";

contract FirstCollection is ERC721, Ownable {

    using Strings for uint256;

    //State variables
    string nonRevealURI;
    string baseURI;
    uint256 tokenToMint = 0;
    uint256 deploymentTime;
    uint256 mintPrice = 1 ether;
    bool isRevealActive;

    //Modifiers
    modifier mintActive() {
        require(deploymentTime + 1 minutes <= block.timestamp, "Mint is disabled");
        _;
    }

    constructor(string memory newNonRevealURI) ERC721("First Collection", "1CO")  { 
        nonRevealURI = newNonRevealURI;
        deploymentTime = block.timestamp;
    }

    function mint() external payable mintActive { 
        require(tokenToMint < 5, "All tokens minted");
        require(msg.value == mintPrice, "Price is not correct");

        tokenToMint += 1;

        _mint(msg.sender, tokenToMint);
        (bool success, ) = payable(owner()).call{value: msg.value}(""); //Pay the NFT and send the ETH to the owner
        require(success, "Payment fail");
    }

    function revealPhase(string memory newBaseURI) external onlyOwner mintActive {

        uint256 currentTime = block.timestamp;
        //Reveal can be carried out during a week
        require(deploymentTime + 1 weeks <= currentTime && //At least 1 week must pass to start the reveal
               deploymentTime + 2 weeks >= currentTime, //A maximum of two weeks must be passed to reveal NFTs
               "Reveal phase closed");
        isRevealActive = true;
        baseURI = newBaseURI;
    }

    function tokenURI(uint tokenId) public view override returns(string memory)  {
        if(isRevealActive){
            return string(abi.encodePacked(baseURI, tokenId.toString(),".json"));
        } else {
            return string(abi.encodePacked(nonRevealURI, "unrevealed.json"));
        }
    }
}
## Project Overview

This project is an example of how NFT collections can collaborate between them. Here we have two different NFT collections,
FirstCollection and SecondCollection, where the way to collaborate is the next one: In SecondCollection, we can mint an NFT 
with a discount of 50% during the first week if we are owners of at least 1 NFT of FirstColleciton. 

## Installation

To install and test this project, you must follow the next steps:

1. Clone the repository in your machine: You can use the git console and simply write the command `git clone https://github.com/franvf/CollaborativeNFT.git.` Alternatively, you can download and extract the project zip file on your machine.

2. Install all the dependencies: In order to make our project work, we need to install all the packages and libraries our project is 
using. To do this, we can simply open the terminal, go to the directory project and write the command `npm i`. Now all the required packages 
will be installed. 

3. Install Ganache and Truffle: If you don't have this software installed yet, it is time to install it. You can download the Ganache GUI installer from [here](https://trufflesuite.com/ganache/). And to install Truffle, you can follow [this](https://trufflesuite.com/docs/truffle/how-to/install/) guide.

4. Test the project: In order to check if the environment is ready, we can start the ganache GUI and then open the terminal and go to the project directory. Then we must execute the command `truffle migrate` to deploy the smart contracts of both collections in our local blockchain. When deployment finishes, we can return to our terminal and execute the test file. This can be done by executing the `truffle test` command in the project directory. Now the JS file in the *test* directory will be executed, and if all is correct, the test will pass.

5. Run the project GUI: Now that we have the SCs deployed on our local blockchain and know they run as expected, we can run the command `npm start` in our project directory. Now our default browser will be launched, our APP will be displayed, and we will be able to interact with our smart contracts using a web page.

## Use case
Once you can see the APP GUI, you can try executing the functions by pressing the buttons. But to execute the functions correctly, you must install the Metamask browser extension. When the APP is running, the metamask wallet will be started, and we will have to connect our wallet to the APP. If we don't do this step, we won't be able to execute the smart contract functions (Take into account that if our wallet is connected to the APP, the metamask extension won't pop-up). 
To mint the first collection NFT, we need to wait three days. To modify this, we can go to the FirstCollection.sol file (First collection smart contract) and change the mintActive modifier to reduce the time. For example, instead of waiting three days until mint, we can wait just 3 minutes. Then, we must re-deploy the smart contract on our local blockchain using the command ` Truffle migrate.` Additionally, we will have to restart our APP. Now, after 3 minutes, we will be able to mint an NFT of the first collection and spend 1 ETH to pay the NFT. After minting the FirstCollection NFT, we will be able to mint the SecondCollection NFT just paying 0.25ETH (this price must be selected in the form) 

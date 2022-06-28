import React, { Component } from 'react';
import Web3 from 'web3';
import MyCollection from '../abis/MyCollection.json'; //To connect tbe backend with the frontend we have to import the .json of our contrat

class newURI extends Component {
    async componentWillMount(){
        await this.loadWeb3()
        await this.loadBlockchainData()
    }

    async loadWeb3(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3){
            window.web3 = Web3(window.web3.currentProvider)
        } else {
            window.alert("No metamask wallet available")
        }
    }

    async loadBlockchainData(){
        const web3 = window.web3

        //Load accounts
        const accounts = await web3.eth.getAccounts() //Get all the accounts in our metamask
        this.setState({account: accounts[0]}) //Current account
        const networkId = 4 //Rinkeby testnet id
        const networkData = MyCollection.networks[networkId] //Get information about this network
        if(networkData){
            const abi = MyCollection.abi //Contract information
            const address = networkData.address //Contract address
            const contract = new web3.eth.Contract(abi, address) // Mount this contract ??
            this.setState({contract})
            console.log(address)
        } else {
            console.log("There are not SC deployed on network")
        }
    }

    constructor(props){
        super(props)
        this.state = {
            account: "",
            contract: null,
            tokenId: 0,
            tokenURI: ""
        }
    }

    newURI = async(tokenId) => {
        try {
            await this.state.contract.methods.modifyURI(tokenId).send({from: this.state.account})
        } catch (err){
            console.log(err)
        }
    }

    render(){
        return(
            <div className = "flex justify-center">
                 <div className = "w-1/2 flex flex-col pb-12"></div>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const tokenId = this.tokenId.value
                        this.newURI(tokenId)
                    }}>

                        <input type="text"
                            className="form-control mb-1"
                            placeholder="TokenId"
                            ref={(input) => this.tokenId = input} />

                        <input type="submit"
                            className="bbtn btn-block btn-primary btn-sm"
                            value="Modify URI" />
                    </form>
                        
                </div>
        )
    }
} export default newURI
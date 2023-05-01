import React, { Component } from 'react';
import Web3 from 'web3';
import firstCollection from '../abis/FirstCollection.json'; //To connect tbe backend with the frontend we have to import the .json of our contrat

class Admin extends Component {
    async componentWillMount(){
        await this.loadMetamask()
        await this.loadFirstContract()
    }

    async loadMetamask(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if(window.web3){
            window.web3 = Web3(window.web3.currentProvider)
        } else {
            window.alert("No metamask wallet available")
        }
    }

    async loadFirstContract(){
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        const networkId = 5777 //Local blockchain id
        const networkData = firstCollection.networks[networkId]
        if(networkData){
            const abi = firstCollection.abi 
            const address = networkData.address
            const currentContract = new web3.eth.Contract(abi, address)
            this.setState({contract: currentContract})
        } else {
            window.alert("No smart contract deployed")
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

    revealPhase = async(newBaseURI) => {
        try {
            await this.state.contract.methods.revealPhase(newBaseURI).send({from: this.state.account})
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
                        const newURI = this.newURI.value
                        this.revealPhase(newURI)
                    }}>

                        <input type="text"
                            className="form-control mb-1"
                            placeholder="New base URI"
                            ref={(input) => this.newURI = input} />

                        <input type="submit"
                            className="ui red button"
                            value="Modify base URI" />
                    </form>
                </div>
        )
    }
} export default Admin
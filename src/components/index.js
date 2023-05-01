import React, { Component } from 'react';
import Web3 from 'web3';
import firstCollection from '../abis/FirstCollection.json'; //To connect the backend with the frontend we have to import the .json of our contrat
import secondCollection from '../abis/SecondCollection.json'; 
import '@metamask/legacy-web3'

class index extends Component {
    //Run this function automatically when the page is refreshed or initialized
    async componentDidMount(){ 
        await this.loadMetamask()
        await this.loadFirstContract()
        await this.loadSecondContract()
    }

    async loadMetamask(){
        if(window.ethereum){ //If metamask exist in the current browser
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.request({method: 'eth_requestAccounts'})
        } else if(window.web3){ //If an old version of metamask is in the current browser
            window.web3 = Web3(window.web3.currentProvider)
        } else {
            window.alert("No metamask wallet available")
        }
    }

    async loadFirstContract(){
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts() //Get a list of the node accounts
        this.setState({account: accounts[0]}) //Get the first account of the list
        const networkId = 5777 //Local blockchain id
        const networkData = firstCollection.networks[networkId] //Search the SC in the selected network
        if(networkData){
            const abi = firstCollection.abi 
            const address = networkData.address
            const currentContract = new web3.eth.Contract(abi, address) //Create the contract object
            this.setState({firstColContract: currentContract})
        } else {
            window.alert("No smart contract deployed")
        }
    }

    async loadSecondContract(){
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        const networkId = 5777 //Local blockchain id
        const networkData = secondCollection.networks[networkId]
        if(networkData){
            const abi = secondCollection.abi 
            const address = networkData.address
            const currentContract = new web3.eth.Contract(abi, address)
            this.setState({secondColContract: currentContract})
        } else {
            window.alert("No smart contract deployed")
        }
    }

    constructor(props){
        super(props)
        this.state = {
            account: "",
            firstColContract: null,
            secondColContract: null
        }
    }

    mintFirst = async() => {
        try {
            const web3 = new Web3()
            const price = web3.utils.toWei('1', 'ether') //Convert an ether to wei
            await this.state.firstColContract.methods.mint().send({from: this.state.account, value: price}) //Call mint function
        }catch (err){
            console.log(err)
        }
    }

    mintSecond = async(nftPrice) => {
        try {
            const web3 = new Web3()
            const price = web3.utils.toWei(nftPrice, 'ether') //Convert the price into Wei
            await this.state.secondColContract.methods.mint().send({from: this.state.account, value: price})
        }catch (err){
            console.log(err)
        }
    }

    render(){
        return(
            <div className = "flex justify-center">
                <div className = "w-1/2 flex flex-col pb-12">
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.loadMetamask()
                    }}>

                        <input type="submit"
                            className="ui orange button"
                            value="Connect wallet" />
                    </form>
                </div>
                <br />
                <div className = "w-1/2 flex flex-col pb-12">
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.mintFirst()
                    }}>

                        <input type="submit"
                            className="ui violet basic button"
                            value="Mint first collection" />
                    </form>
                </div>
                <br />
                <div className = "w-1/2 flex flex-col pb-12">
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const price = this.price.value
                        this.mintSecond(price)
                    }}>
                        <input type="text"
                            className="form-control mb-1"
                            placeholder="Price"
                            ref={(input) => this.price = input} />    

                        <input type="submit"
                            className="ui pink button"
                            value="Mint second collection" /> 
                    </form>
                </div>
            </div>
                
        )
    }
} export default index
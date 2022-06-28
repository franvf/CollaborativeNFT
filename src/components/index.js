import React, { Component } from 'react';
import Web3 from 'web3';
import MyCollection from '../abis/MyCollection.json'; //To connect tbe backend with the frontend we have to import the .json of our contrat
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from "web3modal"
import checkOwnership from '../abis/checkOwnership.json'
import WalletLink from 'walletlink';

class index extends Component {
    // async componentWillMount(){
    //     // await this.loadWeb3()
    //     await this.loadBlockchainData()
    // }

    // async loadWeb3() {
    //     if(window.ethereum){
    //         window.web3 = new Web3(window.ethereum)
    //         await window.ethereum.enable()
    //     } else if(window.web3){
    //         window.web3 = await window.ethereum.send('eth_requestAccounts')
    //     } else {
    //         window.alert("No metamask wallet available")
    //     }
    // }

    loadweb3 = async() => {
        const providerOptions = {
            binancechainwallet: {
                package: true
            },
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "5365a7026e054eb48de548541063ef07"
                }
            },
            walletlink: {
                package: WalletLink,
                otpions: {
                    appName: "Web3 app",
                    infuraId: "5365a7026e054eb48de548541063ef07",
                    rpc: "",
                    chainId: 5777,
                    appLogoUrl: null,
                    darkMode: true
                }
            }
        }

        const myModal = new Web3Modal({
            network: "rinkeby",
            theme: "dark",
            cacheProvider: false,
            providerOptions
        })
        myModal.clearCachedProvider();
        var provider = await myModal.connect()
        console.log(provider)
        var web3 = new Web3(provider)
        await window.ethereum.send('eth_requestAccounts')
        var accounts = await web3.eth.getAccounts()
        this.setState({account: accounts[0]})
        console.log(this.state.account)

    }

    async loadBlockchainData(){
        const web3 = window.web3

        //Load accounts
        // const accounts = await web3.eth.getAccounts() //Get all the accounts in our metamask
        // this.setState({account: accounts[0]}) //Current account
        const networkId = 5777 //Rinkeby testnet id
        const networkData = checkOwnership.networks[networkId] //Get information about this network
        if(networkData){
            const abi = checkOwnership.abi //Contract information
            const address = networkData.address //Contract address
            const contract = new web3.eth.Contract(abi, address) // Mount this contract ??
            this.setState({contract})
            // this.collaboration()
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

    mint = async(tokenId) => {
        try {
            await this.state.contract.methods.mint(tokenId).send({from: this.state.account})
        }catch (err){
            console.log(err)
        }
    }

    collaboration = async() => {
        try {
           const balance =  await this.state.contract.methods.getBalanceOf().send({from: this.state.account})
           window.alert("Your balance is: ", balance)
        } catch(err){
            console.log(err)
        }
    }

    render(){
        return(
            <div className = "flex justify-center">
                <div className = "w-1/2 flex flex-col pb-12">
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.loadweb3()
                    }}>

                        <input type="submit"
                            className="bbtn btn-block btn-primary btn-sm"
                            value="Connect wallet" />
                    </form>
                </div>
                <div className = "w-1/2 flex flex-col pb-12">
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.connectWalletConnect()
                    }}>

                        <input type="submit"
                            className="bbtn btn-block btn-primary btn-sm"
                            value="Connect Wallet" />
                    </form>
                </div>
            </div>
                
        )
    }
} export default index
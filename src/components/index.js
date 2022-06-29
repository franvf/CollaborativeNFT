import React, { Component } from 'react';
import Web3 from 'web3';
import MyCollection from '../abis/MyCollection.json'; //To connect tbe backend with the frontend we have to import the .json of our contrat
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from "web3modal"
import checkOwnership from '../abis/checkOwnership.json'
import WalletLink from 'walletlink';

class index extends Component {
    async componentDidMount(){
        await this.loadWeb3()
    }

    loadWeb3 = async() => {
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
                    chainId: 4,
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
        window.alert("Wallet connected succesfully")

        const networkId = 4 //Rinkeby testnet id
        const networkData = checkOwnership.networks[networkId] //Get information about this network
        if(networkData){
            const abi = checkOwnership.abi //Contract information
            const address = networkData.address //Contract address
            const contract = new web3.eth.Contract(abi, address) // Mount this contract ??
            this.setState({contract})
            console.log(this.state.contract)
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
            const balance =  await this.state.contract.methods.getBalanceOf().call({from: this.state.account})
            if(balance){
                window.alert("You have access")
            } else {
                window.alert("You don't have access")
            }
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
                        this.loadWeb3()
                    }}>

                        <input type="submit"
                            className="bbtn btn-block btn-primary btn-sm"
                            value="Connect wallet" />
                    </form>
                </div>
                <div className = "w-1/2 flex flex-col pb-12">
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        this.collaboration()
                    }}>

                        <input type="submit"
                            className="bbtn btn-block btn-primary btn-sm"
                            value="Check balance" />
                    </form>
                </div>
            </div>
                
        )
    }
} export default index
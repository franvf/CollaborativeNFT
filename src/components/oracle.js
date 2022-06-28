import axios from 'axios'
import React, { Component } from 'react';
import Moralis from '../../node_modules/moralis/node'


class oracle extends Component {

    getInfo = async() => {
        try{
            const serverUrl = "https://5jvfutynhhea.usemoralis.com:2053/server";
            const appId = "bZIgrz9SV8fORtNiFS6iZ3mdQa06OZBzOjm2jdgx";
    
            Moralis.start({ serverUrl, appId });
    
            const options = { address: "0x3f137Bac0bD89d52BfdA9afc07E8A39bE60806dD", chain: "rinkeby" };
            const nftTransfers = await Moralis.Web3API.token.getContractNFTTransfers(options);
            console.log(nftTransfers.result)

            const nftOwners = await Moralis.Web3API.token.getNFTOwners(options);
            console.log(nftOwners)

            const NFTTrades = await Moralis.Web3API.token.getNFTTrades(options);
            console.log(NFTTrades)

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
                        this.getInfo()
                    }}>

                        <input type="submit"
                            className="bbtn btn-block btn-primary btn-sm"
                            value="get holder" />
                    </form>
                </div>
            </div>
        )
    }


} export default oracle



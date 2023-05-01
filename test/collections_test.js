const firstCol = artifacts.require("FirstCollection")
const secondCol = artifacts.require("SecondCollection")
const { time, expectRevert } = require('@openzeppelin/test-helpers');


contract("Collections", (accounts) => {
    
    let fcolContract; 
    let scolContract;

    it("First Collection mint phase not active", async() => {
        fcolContract = await firstCol.deployed()
        await expectRevert(fcolContract.mint(), "Mint is disabled")
    })

    it("Check tokenURI", async() => {
        let tokenURI = await fcolContract.tokenURI(1)
        assert.equal(tokenURI, "https://gateway.pinata.cloud/ipfs/QmeW61hP5183H1Xky5WzbyGL67GivhQGoMyEUFuQPmwahZ/unrevealed.json"
                    , "URIs are different")
    })

    it("Try to reveal before mint", async() => {
        await expectRevert(fcolContract.revealPhase("https://gateway.pinata.cloud/ipfs/QmeW61hP5183H1Xky5WzbyGL67GivhQGoMyEUFuQPmwahZ/"),
                            "Mint is disabled")

    })

    it("Mint", async() => {
        await time.increase(time.duration.days(4)); //Jump 4 days
        let nftPrice = web3.utils.toWei('1', 'ether')
        await fcolContract.mint({ from: accounts[1] ,value: nftPrice})

        let tokenOwner = await fcolContract.ownerOf(1)
        assert.equal(tokenOwner, accounts[1])
    })

    it("Start reveal phase", async() => {
        await time.increase(time.duration.days(4)); //Jump 4 days
        await fcolContract.revealPhase("https://gateway.pinata.cloud/ipfs/QmeW61hP5183H1Xky5WzbyGL67GivhQGoMyEUFuQPmwahZ/")
        
        let tokenURI = await fcolContract.tokenURI(1)
        assert.equal(tokenURI, "https://gateway.pinata.cloud/ipfs/QmeW61hP5183H1Xky5WzbyGL67GivhQGoMyEUFuQPmwahZ/1.json"
        , "URIs are different")
    })

    it("Second collection deployment", async() => {
        scolContract = await secondCol.new(fcolContract.address);
    })

    it("Try to mint second collection", async() => {

        let nftPrice = web3.utils.toWei('0.25', 'ether')
        await expectRevert(scolContract.mint({value: nftPrice}), "You are not firstCollection NFT owner")
        
    })

    it("Mint second collection NFT", async() => {
        let nftPrice = web3.utils.toWei('0.25', 'ether')
        await scolContract.mint({from: accounts[1], value: nftPrice})
        assert(await scolContract.ownerOf(0), accounts[1])
    })

    it("Try to mint again with first account", async() => {
        let nftPrice = web3.utils.toWei('0.25', 'ether') 
        await expectRevert(scolContract.mint({from: accounts[1] ,value: nftPrice}), "You already minted your NFT")
    })

    it("Mint after 1 week", async() => {
        await time.increase(time.duration.weeks(1)); //Jump 1 week
        let nftPrice = web3.utils.toWei('0.50', 'ether')
        await scolContract.mint({from: accounts[2], value: nftPrice})
        assert(await scolContract.ownerOf(1), accounts[2])
    })
})
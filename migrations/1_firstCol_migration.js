const collection = artifacts.require("FirstCollection")

module.exports = function (deployer) {
  deployer.deploy(collection, "https://gateway.pinata.cloud/ipfs/QmeW61hP5183H1Xky5WzbyGL67GivhQGoMyEUFuQPmwahZ/")
};

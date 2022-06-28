const collection = artifacts.require("MyCollection")

module.exports = function (deployer) {
  deployer.deploy(collection)
};

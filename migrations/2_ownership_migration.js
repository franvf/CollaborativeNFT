const collection = artifacts.require("MyCollection")
const checkOwnership = artifacts.require("checkOwnership");

module.exports = async function (deployer) {
  const collectionContract = await collection.deployed()
  await deployer.deploy(checkOwnership, collectionContract.address);
};

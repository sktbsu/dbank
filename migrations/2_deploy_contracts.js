const StarNotary = artifacts.require("StarNotary");

module.exports = function(deployer) {
  deployer.deploy(StarNotary,'Indian Rupees', 'inr', 18, 10000);
};

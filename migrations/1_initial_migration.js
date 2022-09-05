const Migrations = artifacts.require("drive");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};

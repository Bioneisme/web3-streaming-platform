const token = artifacts.require("./StreamToken.sol");
module.exports = function(deployer) {
    deployer.deploy(token).then(function() {
        console.log("Token deployed at " + token.address);
    });
};
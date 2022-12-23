const token = artifacts.require("./SoulBoundStreamToken.sol");
module.exports = function(deployer) {
    deployer.deploy(token).then(function() {
        console.log("SoulBound Token deployed at " + token.address);
    });
};
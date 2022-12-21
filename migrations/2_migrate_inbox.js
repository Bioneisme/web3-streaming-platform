const IPFSInbox = artifacts.require("./Inbox.sol");
module.exports = function(deployer) {
    deployer.deploy(IPFSInbox, 1000000000000).then(function() {
        console.log("IPFSInbox deployed at " + IPFSInbox.address);
    });
};
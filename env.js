const Web3 = require("web3");
// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if its available before instantiating
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const async = require("async");

const SharesController = require("./dist/sharescontroller.js");

const gcb = (err, res) => {
    if (err) {
        console.log("ERROR: " + err);
    } else {
        console.log(JSON.stringify(res, null, 2));
    }
};

let sharesController;

function deployExample(_cb) {
    const cb = _cb || gcb;
    async.series([
        (cb1) => {
            SharesController.deploy(web3, {
                tokenName: "MiniMe Test Token",
                decimalUnits: 0,
                tokenSymbol: "BST",
            }, (err, _sharesController) => {
                if (err) {
                    cb1(err);
                    return;
                }
                sharesController = _sharesController;
                console.log("Shares Controller: " + sharesController.contract.address);
                cb1();
            });
        },
    ], cb);
}

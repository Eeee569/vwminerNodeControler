var zencashjs = require('../lib/zencashjs')
const axios = require("../../node_modules/axios");


//var pubKeys = privKeys.map((x) => zencashjs.address.privKeyToPubKey(x, true))







async function asynccall() {



    let privkey = "L4hinTKPS4NmNmSHuZuC53c9aARAxriMzPM4VqyfjamZQofZZdvN";



    let pubaddr = "znZC3i6Ha7HXfcuoW7umuu2SGqrP7Rzp6QL";

    process.stdout.write(pubaddr)

    let amount = 1;
    let fee = 0.001;


    let fromAddress = "znZC3i6Ha7HXfcuoW7umuu2SGqrP7Rzp6QL";

    let toAddress = "znWYLEcs6qgP8bp7C1UpowZS12ZECDUsT5p"


    let axiosApi;
    axiosApi = axios.create({
        baseURL: "https://explorer.zensystem.io/api",
        timeout: 30000,
    });



    try {
        // Convert to satoshi
        let amountInSatoshi = Math.round(amount * 100000000);
        let feeInSatoshi = Math.round(fee * 100000000);
        let err = "";


        let privateKey = privkey;

        const prevTxURL = "/addr/" + fromAddress + "/utxo";
        const infoURL = "/status?q=getInfo";
        const sendRawTxURL = "/tx/send";

        // Building our transaction TXOBJ
        // Calculate maximum ZEN satoshis that we have
        let satoshisSoFar = 0;
        let history = [];
        let recipients = [{address: toAddress, satoshis: amountInSatoshi}];

        const txData = await apiGet(prevTxURL);
        const infoData = await apiGet(infoURL);

        const blockHeight = infoData.info.blocks - 300;
        const blockHashURL = "/block-index/" + blockHeight;

        const blockHash = (await apiGet(blockHashURL)).blockHash;

        // Iterate through each utxo and append it to history
        for (let i = 0; i < txData.length; i++) {
            if (txData[i].confirmations === 0) {
                continue;
            }

            if (txData[i].isCoinbase) {
                //event.sender.send("send-finish", "error", err);
                console.log("got the coinbase error");
                return;
            }

            history = history.concat({
                txid: txData[i].txid,
                vout: txData[i].vout,
                scriptPubKey: txData[i].scriptPubKey
            });

            // How many satoshis we have so far
            satoshisSoFar = satoshisSoFar + txData[i].satoshis;
            if (satoshisSoFar >= amountInSatoshi + feeInSatoshi) {
                break;
            }
        }

        // If we don't have enough address - fail and tell it to the user
        if (satoshisSoFar < amountInSatoshi + feeInSatoshi) {
            process.stdout.write("not enough in wallet to send");
            return;
        }

        // If we don't have exact amount - refund remaining to current address
        if (satoshisSoFar !== (amountInSatoshi + feeInSatoshi)) {
            let refundSatoshis = satoshisSoFar - amountInSatoshi - feeInSatoshi;
            recipients = recipients.concat({address: fromAddress, satoshis: refundSatoshis});
        }

        // Create transaction
        let txObj = zencashjs.transaction.createRawTx(history, recipients, blockHeight, blockHash);

        // Sign each history transcation
        for (let i = 0; i < history.length; i++) {
            txObj = zencashjs.transaction.signTx(txObj, i, privateKey, true);
        }

        // Convert it to hex string
        const txHexString = zencashjs.transaction.serializeTx(txObj);
        const txRespData = await apiPost(sendRawTxURL, {rawtx: txHexString});

        let message = "TXid:\n\n<small>" + txRespData.txid + "</small><br /><a href=\"javascript:void(0)\" onclick=\"openUrl('" + settings.explorerUrl + "/tx/" + txRespData.txid + "')\" class=\"walletListItemDetails transactionExplorer\" target=\"_blank\">Show Transaction in Explorer</a>";
        econsole.log(message);
    }
    catch (e) {
        //event.sender.send("send-finish", "error", e.message);
        console.log(e);
    }
}

async function apiGet(url) {
     const resp = await axios.get('https://explorer.zensystem.io/api'+url);
    return resp.data;
}

async function apiPost(url, form) {
    const resp =   await axios.post(('https://explorer.zensystem.io/api'+url), querystring.stringify(form));
    return resp.data;
}


asynccall();



const node = require("./NodeWrapper");
const zenjs = require("zencashjs");


const public_address1 = "znWgjKK2NVAmwLCR6r6r7FEtSkbYnWYgtTJ";
const public_address2 = "znoZyy7RB35y5RqSQEoJmumB9f2S4p8pqfP";
const public_address3 = "znVaG4jdnYffXgG1iay7fRj45FC4vGiSidF";
const private_address1 = "KwH7TfnPSQ8Puqs1EwtWyNJrqu9rZxte21CqPG1L3Xs8dYSxBnKN";
const private_address2 = "L4zXW2eiCX3gPEe5gGM3HTCa4gTTAThMww3aAX2GrVjAwtzcqp91";
const private_address3 = "Kyn6MJfvRBbFAwADKuLEixg72Rt3jwqU7c8Bf87Nw3jpiGeWKZwK";


const amount = 2.0;

const SCALE = 100000000;

const bs58check = require('bs58check');
/**
 * Given private key in WIF (compressed or uncompressed), returns a 32-byte buffer with the private key
 * @param    {String}     privKeyWIF      private key in WIF
 * @return   {String}                     the raw private key in hex
 */
function convertWIFToPrivKey(privKeyWIF) {
    // First decode WIF; decoded form is without checksum
    let keyBuffer = bs58check.decode(privKeyWIF);
    // Then drop the version byte (0x80 for mainnet, 0xEF for testnet)
    keyBuffer = keyBuffer.subarray(1, keyBuffer.length);
    // If still not 32 bytes, means it has compression byte; drop it as well
    if (keyBuffer.length !== 32) {
        keyBuffer = keyBuffer.subarray(0, keyBuffer.length - 1);
        if (keyBuffer.length !== 32) {
            throw new Error('Invalid private key length');
        }
    }
    return keyBuffer.toString('hex');
}



run();
async function run() {






    let address_data = await node.async_post("listunspent",[0, 10000000,[public_address2]]);


    console.log(JSON.stringify("post data get " +JSON.stringify(address_data)));


    let past_tx_data = build_past_TX_data_(address_data);


    let block_height = await node.async_post("getblockcount",[]);
    block_height -= 200;

    let block_hash = await node.async_post("getblockhash",[block_height]);

    console.log("block data: "+(block_hash));


    let temptotal = (past_tx_data.total-(SCALE * amount)-10000);

    let tx_out_list = [];

    for(let i = 0; i<past_tx_data.tx_data_list.length;i++){

    }

    let new_tx = zenjs.transaction.createRawTx(
      past_tx_data.tx_data_list,
      [{address: public_address1, satoshis: SCALE * amount},
      /*{address: undefined, data: '', satoshis: 10000},*/ //10000 = 0.0001
      {address: public_address2, satoshis: temptotal}],
      block_height,
      block_hash

    );





    let tx0 = zenjs.transaction.signTx(new_tx, 0, convertWIFToPrivKey(private_address2), true)
    let raw_tx = zenjs.transaction.serializeTx(tx0);

    console.log("raw tx: "+raw_tx);
}


function build_past_TX_data_(data) {

    let total_local = 0;
    let tx_data_list_local= [];

    for(let i = 0; i < data.length;i++){
        if(data[i].spendable == true) {
            total_local += data[i].amount * SCALE;
            tx_data_list_local.push({
                //total:data[i].amount * SCALE,
                txid: data[i].txid,
                vout: data[i].vout,
                scriptPubKey: data[i].scriptPubKey
            });
        }
    }

    return{
      total: total_local,
      tx_data_list:tx_data_list_local
    };

}

/*
function build_past_TX_data_(data) {

    let total_local = 0;
    let tx_data_list_local= [];

    for(let i = 0; i < data.length;i++){
        if(data[i].spendable == true) {
            total_local += data[i].amount * SCALE;
            tx_data_list_local.push({
                txid: data[i].txid,
                vout: data[i].vout,
                scriptPubKey: data[i].scriptPubKey
            });
        }
    }

    return{
      total: total_local,
      tx_data_list:tx_data_list_local
    };

}

 */
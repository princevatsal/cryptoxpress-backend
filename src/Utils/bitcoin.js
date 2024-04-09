const bitcore = require("bitcore-lib");
const axios = require("axios");
const { PrivateKey } = require("bitcore-lib");
const { mainnet, testnet, add } = require("bitcore-lib/lib/networks");
const getAddressFromPrivateKey = (key) => {
  console.log("decoding", key);
  var address = new bitcore.PrivateKey(key).toAddress(testnet);
  const addr = address.toString();
  return addr;
};
const isValidPrivateKey = (key) => {
  console.log(PrivateKey.isValid(key));
  if (PrivateKey.isValid(key)) {
    console.log("valid:-", key);
    return true;
  } else return false;
};

const getBalance = async (address) => {
  try {
    console.log(address);
    const response = await axios.get(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance?token=a8fb0dbfc6094d44b2bdc0cd723c13a9`
    );
    console.log(response.data.balance, "dd");
    return response.data.balance;
  } catch (error) {
    console.error("Error fetching balance:", error.message);
    return null;
  }
};

const getUnspendTnx = async (address) => {
  const resp = await axios(
    `https://api.blockcypher.com/v1/btc/test3/addrs/${address}?unspentOnly=true&token=a8fb0dbfc6094d44b2bdc0cd723c13a9`
  );
  return resp.data?.txrefs;
};
const sendBitcoin = async (from_address, from_key, toAddress, amount) => {
  // const utxos = await getUnspendTnx(from_address);
  // console.log(utxos);
  // let inputs = [];
  // let totalAmountAvailable = 0; // To evaluate, if we have enough funds to send the transaction
  // let inputCount = 0; //
  // for (const element of utxos) {
  //   let input = {
  //     txId: element.tx_hash,
  //     outputIndex: element.tx_output_n,
  //     script: element.tx_hash,
  //     satoshis: element.value,
  //     address: from_address,
  //   };
  //   totalAmountAvailable += element.value;
  //   inputCount += 1;
  //   inputs.push(input);
  // }
  // const transaction = new bitcore.Transaction();
  // const satoshiToSend = amount * 100000000; // 100 million satoshi = 1 Bitcoin
  // let outputCount = 2; // one for recipient, one for change
  // const transactionSize = inputCount * 180 + outputCount * 34 + 10 - inputCount;
  // let fee = transactionSize * 33; // 33 satoshi per byte
  // if (totalAmountAvailable - satoshiToSend - fee < 0) {
  //   // Check, if funds are sufficient to send transaction
  //   throw new Error("Insufficient funds");
  // }
  // transaction.from(inputs);
  // transaction.to(toAddress, Math.floor(satoshiToSend));
  // transaction.change(from_address);
  // transaction.fee(Math.round(fee));
  // transaction.sign(from_key);
  // const serializedTransaction = transaction.serialize();
  // const url = `https://api.blockcypher.com/v1/btc/test3/txs/push?token=a8fb0dbfc6094d44b2bdc0cd723c13a9`;
  // axios({
  //   method: "post",
  //   url: url,
  //   data: {
  //     tx: serializedTransaction,
  //   },
  // })
  //   .then((response) => {
  //     console.log(response.data); // Log the response data
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
};
module.exports = {
  getAddressFromPrivateKey,
  isValidPrivateKey,
  getBalance,
};

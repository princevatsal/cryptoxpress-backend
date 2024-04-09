const express = require("express");
const {
  getAddressFromPrivateKey,
  isValidPrivateKey,
  getBalance,
} = require("./src/Utils/bitcoin");

const app = express();
const port = process.env.port || 3000;
app.get("/getAddressFromPrivateKey", (req, res) => {
  const key = req.query.privatekey;
  if (isValidPrivateKey(key)) {
    const address = getAddressFromPrivateKey(key);
    res.json({ address });
  } else {
    res.status(404).json({ msg: "invalid_key" });
  }
});

app.get("/getBalance", async (req, res) => {
  const address = req.query.address;
  try {
    const bal = await getBalance(address);
    res.json({ balance: bal });
  } catch (err) {
    console.log(err);
    res.status(400).send("err");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

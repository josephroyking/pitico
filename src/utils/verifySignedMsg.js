import withBitbox from "./withBitbox";

const verifySignedMsg = (bitboxInstance, address, signature, message) => {
  try {
    const isValid = bitboxInstance.BitcoinCash.verifyMessage(address, signature, message);
    return isValid;
  } catch (err) {
    return false;
  }
};

export default withBitbox(verifySignedMsg);

import withBitbox from "./withBitbox";

const validateBitcoinAddress = (bitboxInstance, address) => {
  try {
    bitboxInstance.Address.toLegacyAddress(address);
    return true;
  } catch (err) {
    return false;
  }
};

export default withBitbox(validateBitcoinAddress);
